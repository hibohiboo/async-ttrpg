import { client } from '@test/utils/client';

describe('echo', () => {
  test('環境変数が取得できること', async () => {
    const response = await client.api.echo.$get();
    const json = await response.json();
    expect(json.echo).toBe('echo');
  });
});
