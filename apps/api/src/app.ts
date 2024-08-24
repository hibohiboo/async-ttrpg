import characters from './routes/characters';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import transactionTest from './routes/transactionTest';
import { Bindings } from 'hono/types';

const route = new Hono<{ Bindings: Bindings }>()
  .route('/characters', characters)
  .route('/test', transactionTest);
const app = new Hono()
  .use(
    '/api',
    cors({
      origin: '*',
      allowHeaders: ['Content-Type'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
  )
  .route('/api', route);
export default app;
export type AppType = typeof app;
