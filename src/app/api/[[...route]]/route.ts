import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { accountsRouter } from './accounts';
import { errorHandler } from './errorHandler';
import { categoriesRouter } from './categories';

const app = new Hono()
  .basePath('/api')
  .route('/accounts', accountsRouter)
  .route('/categories', categoriesRouter)
  .onError(errorHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type ApiRoutes = typeof app;
