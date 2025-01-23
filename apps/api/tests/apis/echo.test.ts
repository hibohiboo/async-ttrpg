import { describe, expect, test } from 'vitest';
import { client } from '../utils/client';

describe('echo', () => {
  test('should echo', async () => {
    const response = await client.api.echo.$get();
    const json = await response.json();
    expect(json.echo).toBe('echo');
  });
});
