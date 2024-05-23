import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { HTTPException } from 'hono/http-exception';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { accounts } from '@/db/schema';

export const accountsRouter = new Hono().get(
  '/',
  clerkMiddleware(),
  async ctx => {
    const auth = getAuth(ctx);
    if (!auth?.userId)
      throw new HTTPException(401, { message: 'Unauthorized' });

    const data = await db
      .select({ id: accounts.id, name: accounts.name })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));
    return ctx.json({ success: true, data });
  }
);
