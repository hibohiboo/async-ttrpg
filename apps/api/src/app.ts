import { format } from 'date-fns';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono()
  .get('/', (c) => c.text('Hello Azure Functions!'))
  .get('/api/httpTrigger1', async (c) => {
    const name = c.req.query('name') || (await c.req.text()) || 'world';
    console.log(name);
    const time = format(new Date(), 'yyyy-MM-dd: HH:mm:ss');
    return c.json({ msg: `Hello, ${name}!`, time });
  });
app.use('/api/*', cors());
export default app;
export type AppType = typeof app;
