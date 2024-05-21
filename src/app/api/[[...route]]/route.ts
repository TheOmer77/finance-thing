import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

const app = new Hono().basePath('/api');

app.use(
  '*',
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  })
);
app.get('/', ctx => {
  const auth = getAuth(ctx);
  if (!auth?.userId)
    return ctx.json({ success: false, message: "You're not signed in" });

  return ctx.json({ message: 'Hello Next.js!', userId: auth.userId });
});

export const GET = handle(app);
export const POST = handle(app);
