import { Hono } from 'hono';
import { httpTrigger1 } from './handlers/httpTrigger1';
const app = new Hono();
app.get('/', (c) => {
  console.log(c);
  return c.text('Hello Azure Functions!');
});
app.get('/api/httpTrigger1', (c) => httpTrigger1(c));

export default app;
