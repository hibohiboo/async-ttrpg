import { createRoute, z, OpenAPIHono } from '@hono/zod-openapi';
import { format } from 'date-fns';

const app = new OpenAPIHono().openapi(
  createRoute({
    path: '/api/httpTrigger1',
    method: 'get',
    description: '受け取った入力値をそのまま応答する',
    request: {},
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: z.object({
              msg: z.string().openapi({
                example: 'Hello World!',
                description: '応答',
              }),
              time: z.string().openapi({
                example: '2000-01-01',
                description: '日付',
              }),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    const name = c.req.query('name') || (await c.req.text()) || 'world';
    console.log(name);
    const time = format(new Date(), 'yyyy-MM-dd: HH:mm:ss');
    return c.json({ msg: `Hello, ${name}!`, time });
  },
);

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'API',
    version: '1.0.0',
  },
});
export default app;

// const app = new OpenAPIHono()
//   .use(
//     '/api/*',
//     cors({
//       origin: ['*'],
//       allowHeaders: ['X-Custom-Header', 'Content-Type'],
//       allowMethods: ['POST', 'GET', 'OPTIONS'],
//     }),
//   )
//   .get('/', (c) => c.text('Hello Azure Functions!'))
//   .get('/api/httpTrigger1', async (c) => {
//     const name = c.req.query('name') || (await c.req.text()) || 'world';
//     console.log(name);
//     const time = format(new Date(), 'yyyy-MM-dd: HH:mm:ss');
//     return c.json({ msg: `Hello, ${name}!`, time });
//   });
// // https://hono.dev/docs/middleware/builtin/cors
// app.use('/api/*', cors());

export type AppType = typeof app;
