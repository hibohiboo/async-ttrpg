import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { MiddlewareHandler } from 'hono/types';
import characters from '@api/routes/characters';
import transactionTest from '@api/routes/transactionTest';
import { AppContext } from '@api/types';

const route = new Hono<AppContext>()
  .route('/characters', characters)
  .route('/test', transactionTest)
  .get('/echo', async (c) => {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const test = process.env.HOGE;
    return c.json({ echo: test });
  });
const startEndLogMiddleWare: MiddlewareHandler<AppContext> = async (
  c,
  next,
) => {
  const logger = c.env.AZURE_FUNCTIONS_CONTEXT;
  logger.log(`func start: ${c.req.url}`);
  await next();
  logger.log(`func end: ${c.req.url}`);
};

const app = new Hono<AppContext>()
  .use(startEndLogMiddleWare)
  .use(
    cors({
      origin: '*',
      allowHeaders: ['Content-Type'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
  )
  .route('/api', route);
export default app;
export type AppType = typeof app;
