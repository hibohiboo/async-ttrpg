import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { createQueueAndBlobClient } from '@api/lib/createQueueAndBlobServiceClient';
import { sendQueueAndBlobContainer } from '@api/lib/sendQueueAndBlobContainer';
import { AppContext } from '@api/types';
import { CharacterSchema } from '@db/zod';
import { prisma } from '../shared/prisma';

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
        where: { CharacterID },
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
    const { blobServiceClient, queueServiceClient } =
      createQueueAndBlobClient();
    const containerClient = blobServiceClient.getContainerClient(
      'character-container',
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
