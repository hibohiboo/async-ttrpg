import { createQueueAndBlobClient } from '@api/lib/createQueueAndBlobServiceClient';
import { client } from '@test/utils/client';
import { a } from 'vitest/dist/chunks/suite.BJU7kdY9';

describe('echo', () => {
  beforeAll(async () => {
    const { blobServiceClient, queueServiceClient } =
      createQueueAndBlobClient();

    for await (const container of blobServiceClient.listContainers()) {
      await blobServiceClient.deleteContainer(container.name);
    }

    await blobServiceClient.createContainer('character-container');
    await queueServiceClient.createQueue('character-queue');
  });
  test('BlobとQueueにデータを投入できること', async () => {
    const response = await client.api.characters.async.$post({
      json: {
        CharacterID: 'test3',
        CharacterName: 'テストキャラクターあるふぁ',
      },
    });
    expect(response.status).toBe(200);
  });
});
