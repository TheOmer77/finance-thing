import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { accountsRouter } from './accounts';
import { categoriesRouter } from './categories';
import { transactionsRouter } from './transactions';
import { summaryRouter } from './summary';
import { errorHandler } from './errorHandler';

const app = new Hono()
  .basePath('/api')
  .route('/accounts', accountsRouter)
  .route('/categories', categoriesRouter)
  .route('/transactions', transactionsRouter)
  .route('/summary', summaryRouter)
  .onError(errorHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type ApiRoutes = typeof app;
