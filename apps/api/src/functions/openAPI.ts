import { app } from '@azure/functions';
import { azureHonoHandler } from '@marplex/hono-azurefunc-adapter';
import honoApp from '@api/openapi/app';

app.http('openAPI', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'openapi/{*proxy}',
  handler: azureHonoHandler(honoApp.fetch),
});
