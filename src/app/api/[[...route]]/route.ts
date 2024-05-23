import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { accountsRouter } from './accounts';
import { errorHandler } from './errorHandler';

const app = new Hono()
  .basePath('/api')
  .route('/accounts', accountsRouter)
  .onError(errorHandler);

export const GET = handle(app);
export const POST = handle(app);

export type ApiRoutes = typeof app;
