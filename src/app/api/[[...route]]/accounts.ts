import { Hono } from 'hono';

import { db } from '@/db';
import { accounts } from '@/db/schema';

export const accountsRouter = new Hono().get('/', async ctx => {
  const data = await db
    .select({ id: accounts.id, name: accounts.name })
    .from(accounts);
  return ctx.json({ success: true, data });
});
