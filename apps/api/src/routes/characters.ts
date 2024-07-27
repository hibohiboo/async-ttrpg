import { prisma } from '../shared/prisma';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { CharacterSchema } from '@db/zod';
import { z } from 'zod';

const app = new Hono()
  .get('/', async (c) => {
    const characters = await prisma.character.findMany();
    return c.json(characters);
  })
  .post('/', zValidator('json', CharacterSchema), async (c) => {
    const data = await c.req.valid('json');
    const character = await prisma.character.create({ data });
    return c.json(character);
  })
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
  );

export default app;
