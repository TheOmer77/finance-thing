import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const errorHandler: ErrorHandler = (err, ctx) => {
  if (err instanceof HTTPException)
    return ctx.json({ success: false, message: err.message }, err.status);

  console.error(err);
  return ctx.json({ success: false, message: 'Something went wrong.' });
};
