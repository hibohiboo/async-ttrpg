import characters from './routes/characters';
import { Hono } from 'hono';
const route = new Hono().route('/characters', characters);
const app = new Hono().route('/api', route);
export default app;
export type AppType = typeof app;
import { hc } from 'hono/client';

(async () => {
  const client = hc<AppType>(`http://localhost:3030`);

  const res = await client.api.characters[':id'].$put;
})();
