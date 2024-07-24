import { app } from '@azure/functions';
import { prisma } from '@api/shared/prisma';

app.http('testTrigger', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'test',
  handler: async (_r, _c) => ({
    body: JSON.stringify(await prisma.character.findMany()),
  }),
});
