import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createMiddleware } from 'hono/factory';
import { logger as honoLogger } from 'hono/logger';
import { MiddlewareHandler } from 'hono/types';
import characters from '@api/routes/characters';
import transactionTest from '@api/routes/transactionTest';
import { AppContext } from '@api/types';
import sdkTest from './routes/sdkTest';
import { Logger } from './shared/Logger';

const route = new Hono<AppContext>()
  .route('/characters', characters)
  .route('/test', transactionTest)
  .route('/sdk-test', sdkTest)
  .get('/echo', async (c) => {
    const { logger } = c.get('services');

    // ログ出力の順番確認用に少し待つ
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const test = process.env.HOGE;
    logger.log(`echo: ${test}`);
    return c.json({ echo: test });
  });
const honoLoggerMiddleware = createMiddleware<AppContext>(async (c, next) => {
  const logger = new Logger(c.env.AZURE_FUNCTIONS_CONTEXT);
  c.set('services', { logger });
  return honoLogger(logger.info.bind(logger))(c, next);
});
const startEndLogMiddleWare: MiddlewareHandler<AppContext> = async (
  c,
  next,
) => {
  const { logger } = c.get('services');
  logger.log(`func start: ${c.req.url}`);
  await next();
  logger.log(`func end: ${c.req.url}`);
};

const app = new Hono<AppContext>()
  .use(
    cors({
      origin: '*',
      allowHeaders: ['Content-Type'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
  )
  .use(honoLoggerMiddleware)
  .use(startEndLogMiddleWare)
  .route('/api', route);
export default app;
export type AppType = typeof app;
