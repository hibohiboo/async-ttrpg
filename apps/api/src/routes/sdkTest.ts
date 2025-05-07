import { ResourceGraphClient } from '@azure/arm-resourcegraph';
import { DefaultAzureCredential } from '@azure/identity';
import { Hono } from 'hono';

const subscriptionId = 'xxx-xx-xx-xx-xx';
const app = new Hono().post('/', async (c) => {
  const creds = new DefaultAzureCredential();
  // エラー調査用。トークンがとれるか。 → とれた。 ＝ 認証には成功している。
  try {
    const token = await creds.getToken('https://graph.microsoft.com/.default');
    console.log('Token acquired:', token?.token);
  } catch (err) {
    console.error('Failed to acquire token', err);
  }
  const client = new ResourceGraphClient(creds);
  const result = await client.resources({
    subscriptions: [subscriptionId],
    query: `
resources
| where type == 'microsoft.storage/storageaccounts'
| where resourceGroup  == 'async-ttrpg'
    `,
  });
  return c.json(result);
});
export default app;
