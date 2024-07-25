import { app } from '@azure/functions';
import honoApp from '@api/app';
import { azureHonoHandler } from '@marplex/hono-azurefunc-adapter';
app.setup({
  enableHttpStream: true,
});
app.http('httpTrigger', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: '{*proxy}',
  // fetchの引数にはcontextを渡すことができないので第２引数のcontextは失われる。context.logによるログ出力はできないが、関数が１つだけのため関数とログの紐づけができなくなっても影響はない。
  handler: azureHonoHandler(honoApp.fetch),
});
