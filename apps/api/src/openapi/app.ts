import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import sample from './apps/samples';
import characters from './apps/characters';

const route = new OpenAPIHono()
  .route('/', sample)
  .route('/api/characters', characters)
  .doc('/specification', {
    openapi: '3.1.0',
    info: { title: 'API', version: '1.0.0' },
  })
  .get('/doc', swaggerUI({ url: `/openapi/specification` }));

const app = new OpenAPIHono().route(`/openapi`, route);

export default app;
