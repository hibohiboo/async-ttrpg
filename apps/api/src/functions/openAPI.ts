import { app } from '@azure/functions';
import honoApp from '@api/openapi/app';
import { azureHonoHandler } from '@marplex/hono-azurefunc-adapter';

app.http('openAPI', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'openapi/{*proxy}',
  handler: azureHonoHandler(honoApp.fetch),
});
