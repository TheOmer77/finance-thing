import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import {
  differenceInDays,
  eachDayOfInterval,
  isSameDay,
  parse,
  subDays,
} from 'date-fns';
import { and, desc, eq, gte, lt, lte, sql, sum } from 'drizzle-orm';

import { db } from '@/db';
import { accounts, categories, transactions } from '@/db/schema';
import { calculatePercentageChange } from '@/lib/amount';
import { DATE_FORMAT } from '@/constants/api';

const fetchFinancialData = async (
  userId: string,
  startDate: Date,
  endDate: Date,
  accountId?: string
) =>
  (
    await db
      .select({
        income: sql`SUM(
  CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount}
  ELSE 0
  END
)`.mapWith(Number),
        expenses: sql`SUM(
  CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount}
  ELSE 0
  END
)`.mapWith(Number),
        remaining: sum(transactions.amount).mapWith(Number),
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .where(
        and(
          accountId ? eq(transactions.accountId, accountId) : undefined,
          eq(accounts.userId, userId),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate)
        )
      )
  )[0];

const fillMissingDays = (
  activeDays: { date: Date; income: number; expenses: number }[],
  startDate: Date,
  endDate: Date
) => {
  if (activeDays.length < 1) return [];
  return eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
    const existingDay = activeDays.find(day => isSameDay(day.date, date));
    if (existingDay) return existingDay;
    return { date, income: 0, expenses: 0 };
  });
};

export const summaryRouter = new Hono().get(
  '/',
  clerkMiddleware(),
  zValidator(
    'query',
    z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional(),
    })
  ),
  async ctx => {
    const auth = getAuth(ctx);
    if (!auth?.userId)
      throw new HTTPException(401, { message: 'Unauthorized' });

    const { from, to, accountId } = ctx.req.valid('query');

    const defaultTo = new Date(),
      defaultFrom = subDays(defaultTo, 30);
    const startDate = from ? parse(from, DATE_FORMAT, new Date()) : defaultFrom,
      endDate = to ? parse(to, DATE_FORMAT, new Date()) : defaultTo;

    const periodLength = differenceInDays(endDate, startDate) + 1,
      lastPeriodStart = subDays(startDate, periodLength),
      lastPeriodEnd = subDays(endDate, periodLength);

    const periodsData = await Promise.all([
      fetchFinancialData(auth.userId, startDate, endDate, accountId),
      fetchFinancialData(
        auth.userId,
        lastPeriodStart,
        lastPeriodEnd,
        accountId
      ),
    ]).then(([currentPeriod, lastPeriod]) => ({
      incomeAmount: currentPeriod.income,
      incomeChange: calculatePercentageChange(
        currentPeriod.income,
        lastPeriod.income
      ),
      expensesAmount: currentPeriod.expenses,
      expensesChange: calculatePercentageChange(
        currentPeriod.expenses,
        lastPeriod.expenses
      ),
      remainingAmount: currentPeriod.remaining,
      remainingChange: calculatePercentageChange(
        currentPeriod.remaining,
        lastPeriod.remaining
      ),
    }));

    const category = await db
      .select({
        name: categories.name,
        value: sql`SUM(ABS(${transactions.amount}))`.mapWith(Number),
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .innerJoin(categories, eq(transactions.categoryId, categories.id))
      .where(
        and(
          accountId ? eq(transactions.accountId, accountId) : undefined,
          eq(accounts.userId, auth.userId),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate),
          lt(transactions.amount, 0)
        )
      )
      .groupBy(categories.name)
      .orderBy(desc(sql`SUM(ABS(${transactions.amount}))`));
    const topCategories = category.slice(0, 3),
      otherCategories = category.slice(3),
      otherSum = otherCategories.reduce((sum, curr) => sum + curr.value, 0);

    const finalCategories = [
      ...topCategories,
      ...(otherCategories.length > 0
        ? [{ name: 'Other', value: otherSum }]
        : []),
    ];

    const activeDays = await db
        .select({
          date: transactions.date,
          income: sql`SUM(
  CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount}
  ELSE 0
  END
)`.mapWith(Number),
          expenses: sql`SUM(
  CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount}
  ELSE 0
  END
)`.mapWith(Number),
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .where(
          and(
            accountId ? eq(transactions.accountId, accountId) : undefined,
            eq(accounts.userId, auth.userId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate)
          )
        )
        .groupBy(transactions.date)
        .orderBy(transactions.date),
      days = fillMissingDays(activeDays, startDate, endDate);

    return ctx.json({
      success: true,
      data: {
        ...periodsData,
        categories: finalCategories,
        days,
      },
    });
  }
);
