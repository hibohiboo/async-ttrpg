import { createRoute, z } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';
import { CharacterSchema } from '@db/zod';

export const getListRoute = createRoute({
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
});
export const getRoute = createRoute({
  path: '/:id',
  method: 'get',
  description: 'キャラクター取得',
  request: { params: z.object({ id: CharacterSchema.shape.CharacterID }) },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: CharacterSchema,
        },
      },
    },
  },
});
const characterContent = {
  'application/json': {
    schema: CharacterSchema,
  },
};
const defaultResponst = {
  200: {
    description: 'OK',
    content: characterContent,
  },
  // 400: {
  //   description: 'Bad Request',
  //   content: {
  //     'application/json': {
  //       schema: z
  //         .object({ code: z.number().int(), message: z.string() })
  //         .passthrough(),
  //     },
  //   },
  // },
};
export const postRoute = createRoute({
  path: '/',
  method: 'post',
  description: 'キャラクター新規作成',
  responses: defaultResponst,
  request: { body: { content: characterContent } },
});
export const putRoute = createRoute({
  path: '/',
  method: 'put',
  description: 'キャラクター更新',
  responses: defaultResponst,
  request: { body: { content: characterContent } },
});
export const deleteRoute = createRoute({
  path: '/:id',
  method: 'delete',
  description: 'キャラクター削除',
  responses: { ...defaultResponst },
  request: {
    params: z.object({
      id:
        // どちらの書き方でもOK
        // z.string().openapi({ description: 'キャラクターID', example: 'aaa' }),
        CharacterSchema.shape.CharacterID.openapi({
          description: 'キャラクターID',
          example: 'bbb',
        }),
    }),
  },
});
export const putValidator = zValidator(
  'json',
  z.object({ CharacterID: z.string(), CharacterName: z.string() }),
);
