import { app } from '@azure/functions';
import honoApp from '@api/openapi/app';
import { azureHonoHandler } from '@marplex/hono-azurefunc-adapter';

app.http('openAPI', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'openapi/doc',
  // fetchの引数にはcontextを渡すことができないので第２引数のcontextは失われる。context.logによるログ出力はできないが、関数が１つだけのため関数とログの紐づけができなくなっても影響はない。
  handler: azureHonoHandler(honoApp.fetch),
});
