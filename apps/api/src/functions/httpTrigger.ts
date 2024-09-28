import { app } from '@azure/functions';
import honoApp from '@api/app';
import { azureHonoHandler } from '@api/lib/azureHonoHandler';

app.setup({
  enableHttpStream: true,
});

app.http('httpTrigger', {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  authLevel: 'anonymous',
  route: 'api/{*proxy}',
  // 第２引数のcontextはenv.AZURE_FUNCTIONS_CONTEXTに格納する
  handler: azureHonoHandler(honoApp.fetch),
});
