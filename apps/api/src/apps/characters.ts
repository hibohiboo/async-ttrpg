import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { CharacterSchema } from '@db/zod';
import { prisma } from '../shared/prisma';

const app = new OpenAPIHono().openapi(
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
);

export default app;
