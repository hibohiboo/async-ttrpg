import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { CharacterSchema } from '@db/zod';
import { prisma } from '../shared/prisma';
import { zValidator } from '@hono/zod-validator';

const app = new OpenAPIHono()
  .openapi(
    createRoute({
      path: '/',
      method: 'get',
      description: 'キャラクター一覧取得',
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: CharacterSchema.array(),
            },
          },
        },
      },
    }),
    async (c) => {
      const characters = await prisma.character.findMany();
      return c.json(characters);
    },
  )
  .post(zValidator('json', CharacterSchema), async (c) => {
    const data = await c.req.valid('json');
    const character = await prisma.character.create({ data });
    return c.json(character);
  })
  .put(zValidator('json', CharacterSchema), async (c) => {
    const data = await c.req.valid('json');
    const { CharacterID, ...rest } = data;
    const character = await prisma.character.upsert({
      where: { CharacterID: CharacterID },
      create: data,
      update: rest,
    });
    return c.json(character);
  })
  .delete(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string().openapi({ description: 'キャラクターID' }),
      }),
    ),
    async (c) => {
      const character = await prisma.character.delete({
        where: { CharacterID: c.req.valid('param').id },
      });
      return c.json(character);
    },
  );
export default app;
