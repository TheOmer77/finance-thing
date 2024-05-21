import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app.get('/', ctx => {
  return ctx.json({ message: 'Hello Next.js!' });
});

export const GET = handle(app);
export const POST = handle(app);
