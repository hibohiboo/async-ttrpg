import { prisma } from '../shared/prisma';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { CharacterSchema } from '@db/zod';
import { z } from 'zod';
import { AppContext } from '@api/types';
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';
import { QueueServiceClient } from '@azure/storage-queue';
import { sendQueueAndBlobContainer } from '@api/lib/sendQueueAndBlobContainer';

const app = new Hono<AppContext>()
  .get('/', async (c) => {
    const characters = await prisma.character.findMany();
    return c.json(characters);
  })
  .post('/', zValidator('json', CharacterSchema), async (c) => {
    const data = await c.req.valid('json');
    const character = await prisma.character.create({ data });
    return c.json(character);
  })
  .get(
    '/:id',
    zValidator('param', z.object({ id: CharacterSchema.shape.CharacterID })),
    async (c) => {
      const characters = await prisma.character.findFirstOrThrow({
        where: { CharacterID: c.req.valid('param').id },
      });
      return c.json(characters);
    },
  )
  .put(
    '/:id',
    zValidator('param', z.object({ id: CharacterSchema.shape.CharacterID })),
    zValidator('json', CharacterSchema),
    async (c) => {
      const data = await c.req.valid('json');
      const { CharacterID, ...rest } = data;
      const character = await prisma.character.upsert({
        where: { CharacterID: CharacterID },
        create: data,
        update: rest,
      });
      return c.json(character);
    },
  )
  .delete(
    '/:id',
    zValidator('param', z.object({ id: CharacterSchema.shape.CharacterID })),
    async (c) => {
      const character = await prisma.character.delete({
        where: { CharacterID: c.req.valid('param').id },
      });
      return c.json(character);
    },
  )
  .post('/async', zValidator('json', CharacterSchema), async (c) => {
    const logger = c.env.AZURE_FUNCTIONS_CONTEXT;
    const data = await c.req.valid('json');
    const envList = ['BLOB_QUEUE_STORAGE_ACCOUNT__accountName'] as const;
    envList.forEach((k) => {
      if (!process.env[k]) throw new Error(`Missing ${k} environments`);
    });
    const processEnv = process.env as Record<(typeof envList)[number], string>;
    const accountName = processEnv.BLOB_QUEUE_STORAGE_ACCOUNT__accountName;
    if (!accountName) {
      throw new Error('Missing BLOB_QUEUE_STORAGE_ACCOUNT_NAME env var');
    }
    const credential = new DefaultAzureCredential();
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      credential,
    );
    const containerClient = blobServiceClient.getContainerClient(
      'character-container',
    );

    const queueServiceClient = new QueueServiceClient(
      `https://${accountName}.queue.core.windows.net`,
      credential,
    );
    const queueClient = queueServiceClient.getQueueClient('character-queue');

    await sendQueueAndBlobContainer({
      containerClient,
      queueClient,
      blobPath: `${data.CharacterID}.json`,
      blobData: JSON.stringify(data),
      messageTimeToLive: 60 * 60 * 0.5, // 30 minutes
      logger,
    });
    return c.json({});
  });

export default app;
