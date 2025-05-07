import { ResourceGraphClient } from '@azure/arm-resourcegraph';
import { DefaultAzureCredential } from '@azure/identity';
import { Hono } from 'hono';

const app = new Hono().post('/', async (c) => {
  const creds = new DefaultAzureCredential();

  const client = new ResourceGraphClient(creds);
  const result = await client.resources({
    query: `
resources
| where type == 'microsoft.storage/storageaccounts'
| where resourceGroup  == 'async-ttrpg'
    `,
  });
  return c.json(result);
});
export default app;
