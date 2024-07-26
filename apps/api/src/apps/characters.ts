import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
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
  });

export default app;
