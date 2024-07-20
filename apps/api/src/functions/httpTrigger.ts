import { app } from '@azure/functions';
import honoApp from '@/app';
import { azureHonoHandler } from '@/utils/honoAzureFuncAdapter/azureHonoHandler';


app.http('httpTrigger', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: '{*proxy}',
  handler: azureHonoHandler(honoApp.fetch),
});
