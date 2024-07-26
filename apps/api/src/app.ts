import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import sample from './apps/samples';
import characters from './apps/characters';
const app = new OpenAPIHono()
  .route('/', sample)
  .route('/api/characters', characters);
app
  .doc('/specification', {
    openapi: '3.1.0',
    info: { title: 'API', version: '1.0.0' },
  })
  .get('/doc', swaggerUI({ url: '/specification' }));
export default app;

export type AppType = typeof app;
