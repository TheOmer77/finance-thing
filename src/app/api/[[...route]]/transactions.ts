import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import { and, desc, eq, gte, inArray, lte, sql } from 'drizzle-orm';
import { z } from 'zod';
import { parse } from 'date-fns';

import { db } from '@/db';
import {
  transactions,
  insertTransactionSchema,
  categories,
  accounts,
} from '@/db/schema';

const THIRTY_DAYS = 2592000000; // 1000 * 60 * 60 * 24 * 30
const DATE_FORMAT = 'yyyy-MM-dd';

export const transactionsRouter = new Hono()

  .get(
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
        defaultFrom = new Date(defaultTo.valueOf() - THIRTY_DAYS);

      const startDate = from
          ? parse(from, DATE_FORMAT, new Date())
          : defaultFrom,
        endDate = to ? parse(to, DATE_FORMAT, new Date()) : defaultTo;

      const data = await db
        .select({
          id: transactions.id,
          date: transactions.date,
          payee: transactions.payee,
          amount: transactions.amount,
          notes: transactions.notes,
          accountId: accounts.id,
          account: accounts.name,
          categoryId: categories.id,
          category: categories.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
          and(
            accountId ? eq(transactions.accountId, accountId) : undefined,
            eq(accounts.userId, auth.userId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate)
          )
        )
        .orderBy(desc(transactions.date));
      return ctx.json({ success: true, data });
    }
  )

  .get(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    async ctx => {
      const auth = getAuth(ctx);
      if (!auth?.userId)
        throw new HTTPException(401, { message: 'Unauthorized' });

      const { id } = ctx.req.valid('param');
      if (!id)
        throw new HTTPException(400, { message: 'ID param is missing.' });

      const [data] = await db
        .select({
          id: transactions.id,
          date: transactions.date,
          payee: transactions.payee,
          amount: transactions.amount,
          notes: transactions.notes,
          accountId: accounts.id,
          categoryId: categories.id,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(and(eq(transactions.id, id), eq(accounts.userId, auth.userId)));
      if (!data)
        throw new HTTPException(404, {
          message: `Transaction with ID '${id}' was not found.`,
        });
      return ctx.json({ success: true, data });
    }
  )

  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertTransactionSchema),
    async ctx => {
      const auth = getAuth(ctx);
      if (!auth?.userId)
        throw new HTTPException(401, { message: 'Unauthorized' });

      const values = ctx.req.valid('json');

      const [data] = await db.insert(transactions).values(values).returning();
      return ctx.json({ success: true, data });
    }
  )

  .post(
    '/bulk-create',
    clerkMiddleware(),
    zValidator('json', z.array(insertTransactionSchema)),
    async ctx => {
      const auth = getAuth(ctx);
      if (!auth?.userId)
        throw new HTTPException(401, { message: 'Unauthorized' });

      const values = ctx.req.valid('json');
      const data = await db.insert(transactions).values(values).returning();

      return ctx.json({ success: true, data });
    }
  )

  .post(
    '/bulk-delete',
    clerkMiddleware(),
    zValidator('json', z.object({ ids: z.array(z.string()) })),
    async ctx => {
      const auth = getAuth(ctx);
      if (!auth?.userId)
        throw new HTTPException(401, { message: 'Unauthorized' });

      const { ids } = ctx.req.valid('json');

      const transactionsToDelete = db.$with('transactions_to_delete').as(
        db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(
            and(inArray(transactions.id, ids), eq(accounts.userId, auth.userId))
          )
      );
      const data = await db
        .with(transactionsToDelete)
        .delete(transactions)
        .where(
          inArray(
            transactions.id,
            sql`(SELECT id FROM ${transactionsToDelete})`
          )
        )
        .returning({ id: transactions.id });
      return ctx.json({ success: true, data });
    }
  )

  .patch(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    zValidator('json', insertTransactionSchema),
    async ctx => {
      const auth = getAuth(ctx);
      if (!auth?.userId)
        throw new HTTPException(401, { message: 'Unauthorized' });

      const { id } = ctx.req.valid('param');
      if (!id)
        throw new HTTPException(400, { message: 'ID param is missing.' });

      const values = ctx.req.valid('json');

      const transactionsToUpdate = db.$with('transactions_to_update').as(
        db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(eq(transactions.id, id), eq(accounts.userId, auth.userId)))
      );
      const [data] = await db
        .with(transactionsToUpdate)
        .update(transactions)
        .set(values)
        .where(
          inArray(
            transactions.id,
            sql`(SELECT id FROM ${transactionsToUpdate})`
          )
        )
        .returning();

      if (!data)
        throw new HTTPException(404, {
          message: `Transaction with ID '${id}' was not found.`,
        });
      return ctx.json({ success: true, data });
    }
  )

  .delete(
    '/:id',
    clerkMiddleware(),
    zValidator('param', z.object({ id: z.string().optional() })),
    async ctx => {
      const auth = getAuth(ctx);
      if (!auth?.userId)
        throw new HTTPException(401, { message: 'Unauthorized' });

      const { id } = ctx.req.valid('param');
      if (!id)
        throw new HTTPException(400, { message: 'ID param is missing.' });

      const transactionsToDelete = db.$with('transactions_to_delete').as(
        db
          .select({ id: transactions.id })
          .from(transactions)
          .innerJoin(accounts, eq(transactions.accountId, accounts.id))
          .where(and(eq(transactions.id, id), eq(accounts.userId, auth.userId)))
      );
      const [data] = await db
        .with(transactionsToDelete)
        .delete(transactions)
        .where(
          inArray(
            transactions.id,
            sql`(SELECT id FROM ${transactionsToDelete})`
          )
        )
        .returning({ id: transactions.id });
      if (!data)
        throw new HTTPException(404, {
          message: `Transaction with ID '${id}' was not found.`,
        });
      return ctx.json({ success: true, data });
    }
  );
