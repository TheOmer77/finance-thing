import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import { and, eq, inArray } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { accounts, insertAccountSchema } from '@/db/schema';

export const accountsRouter = new Hono()

  .get('/', clerkMiddleware(), async ctx => {
    const auth = getAuth(ctx);
    if (!auth?.userId)
      throw new HTTPException(401, { message: 'Unauthorized' });

    const data = await db
      .select({ id: accounts.id, name: accounts.name })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));
    return ctx.json({ success: true, data });
  })

  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertAccountSchema.pick({ name: true })),
    async ctx => {
      const auth = getAuth(ctx);
      if (!auth?.userId)
        throw new HTTPException(401, { message: 'Unauthorized' });

      const { name } = ctx.req.valid('json');

      const [data] = await db
        .insert(accounts)
        .values({ name, userId: auth.userId })
        .returning();
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
      const data = await db
        .delete(accounts)
        .where(and(eq(accounts.userId, auth.userId), inArray(accounts.id, ids)))
        .returning({ id: accounts.id });
      return ctx.json({ success: true, data });
    }
  );
