import { app } from '@azure/functions';
import honoApp from '@api/app';
import { azureHonoHandler } from '@api/utils/honoAzureFuncAdapter/azureHonoHandler';

app.http('httpTrigger', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: '{*proxy}',
  handler: azureHonoHandler(honoApp.fetch),
});
