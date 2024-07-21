import { Hono } from 'hono';
import { httpTrigger1 } from './handlers/httpTrigger1';
const app = new Hono();
app.get('/', (c) => c.text('Hello Azure Functions!'));
app.get('/api/httpTrigger1', httpTrigger1);

export default app;
export type AppType = typeof app;
