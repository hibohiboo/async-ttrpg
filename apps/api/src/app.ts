import characters from './routes/characters';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import transactionTest from './routes/transactionTest';
import { MiddlewareHandler } from 'hono/types';
import { AppContext } from './types';

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
