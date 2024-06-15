import { createMiddleware } from "hono/factory";

export const log = createMiddleware((c, next) => {
  console.log(`${c.req.method} - ${c.req.path}`);
  return next();
});
