import { ResourceGraphClient } from '@azure/arm-resourcegraph';
import { DefaultAzureCredential } from '@azure/identity';
import { Hono } from 'hono';

const subscriptionId = '00000000-0000-0000-0000-000000000000';
const app = new Hono().post('/', async (c) => {
  const creds = new DefaultAzureCredential();

  // @ts-expect-error subscriptionId is not a valid parameter
  const client = new ResourceGraphClient(creds, subscriptionId);
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
