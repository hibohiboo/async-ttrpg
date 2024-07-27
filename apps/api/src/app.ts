import characters from './routes/characters';
import { Hono } from 'hono';
const route = new Hono().route('/characters', characters);
const app = new Hono().route('/api', route);
export default app;
export type AppType = typeof app;
