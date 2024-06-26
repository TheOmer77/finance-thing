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
import { isErrorObj } from '@/lib/isErrorObj';
import { DATE_FORMAT, PROMISE_REJECT_ERROR } from '@/constants/api';
import type { ResolvedOrError } from '@/types/api';

const DEFAULT_PERIOD = { income: 0, expenses: 0, remaining: 0 };

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

    // No await here, because all promises will be Promise.allSettled below
    const periodsPromise = Promise.all([
      fetchFinancialData(auth.userId, startDate, endDate, accountId),
      fetchFinancialData(
        auth.userId,
        lastPeriodStart,
        lastPeriodEnd,
        accountId
      ),
    ]);

    const categoriesPromise = db
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
      .orderBy(desc(sql`SUM(ABS(${transactions.amount}))`))
      .then(category => {
        const topCategories = category.slice(0, 3),
          otherCategories = category.slice(3),
          otherSum = otherCategories.reduce((sum, curr) => sum + curr.value, 0);
        return [
          ...topCategories,
          ...(otherCategories.length > 0
            ? [{ name: 'Other', value: otherSum }]
            : []),
        ];
      });

    const daysPromise = db
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
      .orderBy(transactions.date)
      .then(activeDays => fillMissingDays(activeDays, startDate, endDate));

    const [periods, finalCategories, days] = (
      await Promise.allSettled([periodsPromise, categoriesPromise, daysPromise])
    ).map(result =>
      result.status === 'fulfilled' ? result.value : PROMISE_REJECT_ERROR
    ) as [
      ResolvedOrError<typeof periodsPromise>,
      ResolvedOrError<typeof categoriesPromise>,
      ResolvedOrError<typeof daysPromise>,
    ];
    const [currentPeriod, lastPeriod] = isErrorObj(periods)
      ? [DEFAULT_PERIOD, DEFAULT_PERIOD]
      : periods;

    const incomeAmount = currentPeriod.income,
      incomeChange = calculatePercentageChange(
        currentPeriod.income,
        lastPeriod.income
      ),
      expensesAmount = currentPeriod.expenses,
      expensesChange = calculatePercentageChange(
        currentPeriod.expenses,
        lastPeriod.expenses
      ),
      remainingAmount = currentPeriod.remaining,
      remainingChange = calculatePercentageChange(
        currentPeriod.remaining,
        lastPeriod.remaining
      );

    return ctx.json({
      success: true,
      data: {
        incomeAmount,
        incomeChange,
        expensesAmount,
        expensesChange,
        remainingAmount,
        remainingChange,
        categories: finalCategories,
        days,
      },
    });
  }
);
