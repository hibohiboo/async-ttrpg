import { createRoute, z, OpenAPIHono } from '@hono/zod-openapi';
import { format } from 'date-fns';

const app = new OpenAPIHono()
  .openapi(
    createRoute({
      path: '/',
      method: 'get',
      description: 'Hello World テスト',
      request: {},
      responses: {
        200: {
          description: 'OK',
          content: {
            'text/plain': {
              schema: z.string().openapi({
                example: 'Hello World!',
                description: '文字列を返すサンプル',
              }),
            },
          },
        },
      },
    }),
    async (c) => c.text('Hello Azure Functions!'),
  )
  .openapi(
    createRoute({
      path: '/api/httpTrigger1',
      method: 'get',
      description: '日時出力テスト',
      request: {
        query: z.object({
          name: z.string().optional().openapi({
            example: 'world',
            description: '名前',
          }),
        }),
      },
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

export default app;
