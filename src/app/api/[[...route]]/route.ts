import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { accountsRouter } from './accounts';

const app = new Hono().basePath('/api');

const routes = app.route('/accounts', accountsRouter);

export const GET = handle(app);
export const POST = handle(app);

export type ApiRoutes = typeof routes;
