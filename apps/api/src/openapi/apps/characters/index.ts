import { OpenAPIHono } from '@hono/zod-openapi';
import {
  deleteRoute,
  getListRoute,
  getRoute,
  postRoute,
  putRoute,
} from './routes';

const app = new OpenAPIHono()
  .openapi(getListRoute, async (c) =>
    c.json([{ CharacterID: '1', CharacterName: 'test' }]),
  )
  .openapi(getRoute, async (c) =>
    c.json({ CharacterID: '1', CharacterName: 'test' }),
  )
  .openapi(postRoute, async (c) => {
    const data = await c.req.valid('json');
    return c.json(data);
  })
  .openapi(putRoute, async (c) => {
    const data = await c.req.valid('json');
    return c.json(data);
  })
  .openapi(deleteRoute, async (c) =>
    c.json({ CharacterID: '1', CharacterName: 'test' }),
  );
export default app;
