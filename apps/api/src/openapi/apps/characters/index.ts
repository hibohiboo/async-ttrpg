import { OpenAPIHono } from '@hono/zod-openapi';
import { prisma } from '@api/shared/prisma';
import { deleteRoute, getRoute, postRoute, putValidator } from './routes';

const app = new OpenAPIHono()
  .openapi(getRoute, async (c) => {
    const characters = await prisma.character.findMany();
    return c.json(characters);
  })
  .openapi(postRoute, async (c) => {
    const data = await c.req.valid('json');
    const character = await prisma.character.create({ data });
    return c.json(character);
  })
  .openapi(deleteRoute, async (c) => {
    const character = await prisma.character.delete({
      where: { CharacterID: c.req.valid('param').id },
    });
    return c.json(character);
  })
  .put(putValidator, async (c) => {
    const data = await c.req.valid('json');
    const { CharacterID, ...rest } = data;
    const character = await prisma.character.upsert({
      where: { CharacterID: CharacterID },
      create: data,
      update: rest,
    });
    return c.json(character);
  });
export default app;
