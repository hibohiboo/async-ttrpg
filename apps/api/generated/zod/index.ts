import { z } from 'zod';
import type { Prisma } from '../client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable','Snapshot']);

export const CharacterScalarFieldEnumSchema = z.enum(['CharacterID','CharacterName']);

export const PlayerCharactersScalarFieldEnumSchema = z.enum(['PlayerID','CharacterID']);

export const PlayersScalarFieldEnumSchema = z.enum(['PlayerID','PlayerName','CharacterMaxCount']);

export const SortOrderSchema = z.enum(['asc','desc']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CHARACTER SCHEMA
/////////////////////////////////////////

export const CharacterSchema = z.object({
  CharacterID: z.string(),
  CharacterName: z.string(),
})

export type Character = z.infer<typeof CharacterSchema>

/////////////////////////////////////////
// PLAYER CHARACTERS SCHEMA
/////////////////////////////////////////

export const PlayerCharactersSchema = z.object({
  PlayerID: z.string(),
  CharacterID: z.string(),
})

export type PlayerCharacters = z.infer<typeof PlayerCharactersSchema>

/////////////////////////////////////////
// PLAYERS SCHEMA
/////////////////////////////////////////

export const PlayersSchema = z.object({
  PlayerID: z.string(),
  PlayerName: z.string(),
  CharacterMaxCount: z.number().int(),
})

export type Players = z.infer<typeof PlayersSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CHARACTER
//------------------------------------------------------

export const CharacterSelectSchema: z.ZodType<Prisma.CharacterSelect> = z.object({
  CharacterID: z.boolean().optional(),
  CharacterName: z.boolean().optional(),
}).strict()

// PLAYER CHARACTERS
//------------------------------------------------------

export const PlayerCharactersSelectSchema: z.ZodType<Prisma.PlayerCharactersSelect> = z.object({
  PlayerID: z.boolean().optional(),
  CharacterID: z.boolean().optional(),
}).strict()

// PLAYERS
//------------------------------------------------------

export const PlayersSelectSchema: z.ZodType<Prisma.PlayersSelect> = z.object({
  PlayerID: z.boolean().optional(),
  PlayerName: z.boolean().optional(),
  CharacterMaxCount: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CharacterWhereInputSchema: z.ZodType<Prisma.CharacterWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CharacterWhereInputSchema),z.lazy(() => CharacterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CharacterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CharacterWhereInputSchema),z.lazy(() => CharacterWhereInputSchema).array() ]).optional(),
  CharacterID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CharacterName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CharacterOrderByWithRelationInputSchema: z.ZodType<Prisma.CharacterOrderByWithRelationInput> = z.object({
  CharacterID: z.lazy(() => SortOrderSchema).optional(),
  CharacterName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CharacterWhereUniqueInputSchema: z.ZodType<Prisma.CharacterWhereUniqueInput> = z.object({
  CharacterID: z.string()
})
.and(z.object({
  CharacterID: z.string().optional(),
  AND: z.union([ z.lazy(() => CharacterWhereInputSchema),z.lazy(() => CharacterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CharacterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CharacterWhereInputSchema),z.lazy(() => CharacterWhereInputSchema).array() ]).optional(),
  CharacterName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export const CharacterOrderByWithAggregationInputSchema: z.ZodType<Prisma.CharacterOrderByWithAggregationInput> = z.object({
  CharacterID: z.lazy(() => SortOrderSchema).optional(),
  CharacterName: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CharacterCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CharacterMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CharacterMinOrderByAggregateInputSchema).optional()
}).strict();

export const CharacterScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CharacterScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CharacterScalarWhereWithAggregatesInputSchema),z.lazy(() => CharacterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CharacterScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CharacterScalarWhereWithAggregatesInputSchema),z.lazy(() => CharacterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  CharacterID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  CharacterName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PlayerCharactersWhereInputSchema: z.ZodType<Prisma.PlayerCharactersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerCharactersWhereInputSchema),z.lazy(() => PlayerCharactersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerCharactersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerCharactersWhereInputSchema),z.lazy(() => PlayerCharactersWhereInputSchema).array() ]).optional(),
  PlayerID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CharacterID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PlayerCharactersOrderByWithRelationInputSchema: z.ZodType<Prisma.PlayerCharactersOrderByWithRelationInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  CharacterID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerCharactersWhereUniqueInputSchema: z.ZodType<Prisma.PlayerCharactersWhereUniqueInput> = z.object({
  PlayerID_CharacterID: z.lazy(() => PlayerCharactersPlayerIDCharacterIDCompoundUniqueInputSchema)
})
.and(z.object({
  PlayerID_CharacterID: z.lazy(() => PlayerCharactersPlayerIDCharacterIDCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PlayerCharactersWhereInputSchema),z.lazy(() => PlayerCharactersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerCharactersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerCharactersWhereInputSchema),z.lazy(() => PlayerCharactersWhereInputSchema).array() ]).optional(),
  PlayerID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CharacterID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict());

export const PlayerCharactersOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlayerCharactersOrderByWithAggregationInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  CharacterID: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PlayerCharactersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlayerCharactersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlayerCharactersMinOrderByAggregateInputSchema).optional()
}).strict();

export const PlayerCharactersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlayerCharactersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerCharactersScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayerCharactersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerCharactersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerCharactersScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayerCharactersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PlayerID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  CharacterID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PlayersWhereInputSchema: z.ZodType<Prisma.PlayersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlayersWhereInputSchema),z.lazy(() => PlayersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayersWhereInputSchema),z.lazy(() => PlayersWhereInputSchema).array() ]).optional(),
  PlayerID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  PlayerName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CharacterMaxCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PlayersOrderByWithRelationInputSchema: z.ZodType<Prisma.PlayersOrderByWithRelationInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  PlayerName: z.lazy(() => SortOrderSchema).optional(),
  CharacterMaxCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayersWhereUniqueInputSchema: z.ZodType<Prisma.PlayersWhereUniqueInput> = z.object({
  PlayerID: z.string()
})
.and(z.object({
  PlayerID: z.string().optional(),
  AND: z.union([ z.lazy(() => PlayersWhereInputSchema),z.lazy(() => PlayersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayersWhereInputSchema),z.lazy(() => PlayersWhereInputSchema).array() ]).optional(),
  PlayerName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CharacterMaxCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
}).strict());

export const PlayersOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlayersOrderByWithAggregationInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  PlayerName: z.lazy(() => SortOrderSchema).optional(),
  CharacterMaxCount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PlayersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PlayersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlayersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlayersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PlayersSumOrderByAggregateInputSchema).optional()
}).strict();

export const PlayersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlayersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlayersScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayersScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  PlayerID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  PlayerName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  CharacterMaxCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CharacterCreateInputSchema: z.ZodType<Prisma.CharacterCreateInput> = z.object({
  CharacterID: z.string(),
  CharacterName: z.string()
}).strict();

export const CharacterUncheckedCreateInputSchema: z.ZodType<Prisma.CharacterUncheckedCreateInput> = z.object({
  CharacterID: z.string(),
  CharacterName: z.string()
}).strict();

export const CharacterUpdateInputSchema: z.ZodType<Prisma.CharacterUpdateInput> = z.object({
  CharacterID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CharacterUncheckedUpdateInputSchema: z.ZodType<Prisma.CharacterUncheckedUpdateInput> = z.object({
  CharacterID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CharacterCreateManyInputSchema: z.ZodType<Prisma.CharacterCreateManyInput> = z.object({
  CharacterID: z.string(),
  CharacterName: z.string()
}).strict();

export const CharacterUpdateManyMutationInputSchema: z.ZodType<Prisma.CharacterUpdateManyMutationInput> = z.object({
  CharacterID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CharacterUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CharacterUncheckedUpdateManyInput> = z.object({
  CharacterID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCharactersCreateInputSchema: z.ZodType<Prisma.PlayerCharactersCreateInput> = z.object({
  PlayerID: z.string(),
  CharacterID: z.string()
}).strict();

export const PlayerCharactersUncheckedCreateInputSchema: z.ZodType<Prisma.PlayerCharactersUncheckedCreateInput> = z.object({
  PlayerID: z.string(),
  CharacterID: z.string()
}).strict();

export const PlayerCharactersUpdateInputSchema: z.ZodType<Prisma.PlayerCharactersUpdateInput> = z.object({
  PlayerID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCharactersUncheckedUpdateInputSchema: z.ZodType<Prisma.PlayerCharactersUncheckedUpdateInput> = z.object({
  PlayerID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCharactersCreateManyInputSchema: z.ZodType<Prisma.PlayerCharactersCreateManyInput> = z.object({
  PlayerID: z.string(),
  CharacterID: z.string()
}).strict();

export const PlayerCharactersUpdateManyMutationInputSchema: z.ZodType<Prisma.PlayerCharactersUpdateManyMutationInput> = z.object({
  PlayerID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCharactersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlayerCharactersUncheckedUpdateManyInput> = z.object({
  PlayerID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayersCreateInputSchema: z.ZodType<Prisma.PlayersCreateInput> = z.object({
  PlayerID: z.string(),
  PlayerName: z.string(),
  CharacterMaxCount: z.number().int()
}).strict();

export const PlayersUncheckedCreateInputSchema: z.ZodType<Prisma.PlayersUncheckedCreateInput> = z.object({
  PlayerID: z.string(),
  PlayerName: z.string(),
  CharacterMaxCount: z.number().int()
}).strict();

export const PlayersUpdateInputSchema: z.ZodType<Prisma.PlayersUpdateInput> = z.object({
  PlayerID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PlayerName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterMaxCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayersUncheckedUpdateInputSchema: z.ZodType<Prisma.PlayersUncheckedUpdateInput> = z.object({
  PlayerID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PlayerName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterMaxCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayersCreateManyInputSchema: z.ZodType<Prisma.PlayersCreateManyInput> = z.object({
  PlayerID: z.string(),
  PlayerName: z.string(),
  CharacterMaxCount: z.number().int()
}).strict();

export const PlayersUpdateManyMutationInputSchema: z.ZodType<Prisma.PlayersUpdateManyMutationInput> = z.object({
  PlayerID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PlayerName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterMaxCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlayersUncheckedUpdateManyInput> = z.object({
  PlayerID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  PlayerName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CharacterMaxCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const CharacterCountOrderByAggregateInputSchema: z.ZodType<Prisma.CharacterCountOrderByAggregateInput> = z.object({
  CharacterID: z.lazy(() => SortOrderSchema).optional(),
  CharacterName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CharacterMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CharacterMaxOrderByAggregateInput> = z.object({
  CharacterID: z.lazy(() => SortOrderSchema).optional(),
  CharacterName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CharacterMinOrderByAggregateInputSchema: z.ZodType<Prisma.CharacterMinOrderByAggregateInput> = z.object({
  CharacterID: z.lazy(() => SortOrderSchema).optional(),
  CharacterName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const PlayerCharactersPlayerIDCharacterIDCompoundUniqueInputSchema: z.ZodType<Prisma.PlayerCharactersPlayerIDCharacterIDCompoundUniqueInput> = z.object({
  PlayerID: z.string(),
  CharacterID: z.string()
}).strict();

export const PlayerCharactersCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerCharactersCountOrderByAggregateInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  CharacterID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerCharactersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerCharactersMaxOrderByAggregateInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  CharacterID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerCharactersMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerCharactersMinOrderByAggregateInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  CharacterID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const PlayersCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlayersCountOrderByAggregateInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  PlayerName: z.lazy(() => SortOrderSchema).optional(),
  CharacterMaxCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PlayersAvgOrderByAggregateInput> = z.object({
  CharacterMaxCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlayersMaxOrderByAggregateInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  PlayerName: z.lazy(() => SortOrderSchema).optional(),
  CharacterMaxCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayersMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlayersMinOrderByAggregateInput> = z.object({
  PlayerID: z.lazy(() => SortOrderSchema).optional(),
  PlayerName: z.lazy(() => SortOrderSchema).optional(),
  CharacterMaxCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayersSumOrderByAggregateInputSchema: z.ZodType<Prisma.PlayersSumOrderByAggregateInput> = z.object({
  CharacterMaxCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CharacterFindFirstArgsSchema: z.ZodType<Prisma.CharacterFindFirstArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  where: CharacterWhereInputSchema.optional(),
  orderBy: z.union([ CharacterOrderByWithRelationInputSchema.array(),CharacterOrderByWithRelationInputSchema ]).optional(),
  cursor: CharacterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CharacterScalarFieldEnumSchema,CharacterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CharacterFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CharacterFindFirstOrThrowArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  where: CharacterWhereInputSchema.optional(),
  orderBy: z.union([ CharacterOrderByWithRelationInputSchema.array(),CharacterOrderByWithRelationInputSchema ]).optional(),
  cursor: CharacterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CharacterScalarFieldEnumSchema,CharacterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CharacterFindManyArgsSchema: z.ZodType<Prisma.CharacterFindManyArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  where: CharacterWhereInputSchema.optional(),
  orderBy: z.union([ CharacterOrderByWithRelationInputSchema.array(),CharacterOrderByWithRelationInputSchema ]).optional(),
  cursor: CharacterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CharacterScalarFieldEnumSchema,CharacterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CharacterAggregateArgsSchema: z.ZodType<Prisma.CharacterAggregateArgs> = z.object({
  where: CharacterWhereInputSchema.optional(),
  orderBy: z.union([ CharacterOrderByWithRelationInputSchema.array(),CharacterOrderByWithRelationInputSchema ]).optional(),
  cursor: CharacterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CharacterGroupByArgsSchema: z.ZodType<Prisma.CharacterGroupByArgs> = z.object({
  where: CharacterWhereInputSchema.optional(),
  orderBy: z.union([ CharacterOrderByWithAggregationInputSchema.array(),CharacterOrderByWithAggregationInputSchema ]).optional(),
  by: CharacterScalarFieldEnumSchema.array(),
  having: CharacterScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CharacterFindUniqueArgsSchema: z.ZodType<Prisma.CharacterFindUniqueArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  where: CharacterWhereUniqueInputSchema,
}).strict() ;

export const CharacterFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CharacterFindUniqueOrThrowArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  where: CharacterWhereUniqueInputSchema,
}).strict() ;

export const PlayerCharactersFindFirstArgsSchema: z.ZodType<Prisma.PlayerCharactersFindFirstArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  where: PlayerCharactersWhereInputSchema.optional(),
  orderBy: z.union([ PlayerCharactersOrderByWithRelationInputSchema.array(),PlayerCharactersOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerCharactersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerCharactersScalarFieldEnumSchema,PlayerCharactersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerCharactersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlayerCharactersFindFirstOrThrowArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  where: PlayerCharactersWhereInputSchema.optional(),
  orderBy: z.union([ PlayerCharactersOrderByWithRelationInputSchema.array(),PlayerCharactersOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerCharactersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerCharactersScalarFieldEnumSchema,PlayerCharactersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerCharactersFindManyArgsSchema: z.ZodType<Prisma.PlayerCharactersFindManyArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  where: PlayerCharactersWhereInputSchema.optional(),
  orderBy: z.union([ PlayerCharactersOrderByWithRelationInputSchema.array(),PlayerCharactersOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerCharactersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerCharactersScalarFieldEnumSchema,PlayerCharactersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerCharactersAggregateArgsSchema: z.ZodType<Prisma.PlayerCharactersAggregateArgs> = z.object({
  where: PlayerCharactersWhereInputSchema.optional(),
  orderBy: z.union([ PlayerCharactersOrderByWithRelationInputSchema.array(),PlayerCharactersOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerCharactersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayerCharactersGroupByArgsSchema: z.ZodType<Prisma.PlayerCharactersGroupByArgs> = z.object({
  where: PlayerCharactersWhereInputSchema.optional(),
  orderBy: z.union([ PlayerCharactersOrderByWithAggregationInputSchema.array(),PlayerCharactersOrderByWithAggregationInputSchema ]).optional(),
  by: PlayerCharactersScalarFieldEnumSchema.array(),
  having: PlayerCharactersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayerCharactersFindUniqueArgsSchema: z.ZodType<Prisma.PlayerCharactersFindUniqueArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  where: PlayerCharactersWhereUniqueInputSchema,
}).strict() ;

export const PlayerCharactersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlayerCharactersFindUniqueOrThrowArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  where: PlayerCharactersWhereUniqueInputSchema,
}).strict() ;

export const PlayersFindFirstArgsSchema: z.ZodType<Prisma.PlayersFindFirstArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  where: PlayersWhereInputSchema.optional(),
  orderBy: z.union([ PlayersOrderByWithRelationInputSchema.array(),PlayersOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayersScalarFieldEnumSchema,PlayersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlayersFindFirstOrThrowArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  where: PlayersWhereInputSchema.optional(),
  orderBy: z.union([ PlayersOrderByWithRelationInputSchema.array(),PlayersOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayersScalarFieldEnumSchema,PlayersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayersFindManyArgsSchema: z.ZodType<Prisma.PlayersFindManyArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  where: PlayersWhereInputSchema.optional(),
  orderBy: z.union([ PlayersOrderByWithRelationInputSchema.array(),PlayersOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayersScalarFieldEnumSchema,PlayersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayersAggregateArgsSchema: z.ZodType<Prisma.PlayersAggregateArgs> = z.object({
  where: PlayersWhereInputSchema.optional(),
  orderBy: z.union([ PlayersOrderByWithRelationInputSchema.array(),PlayersOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayersGroupByArgsSchema: z.ZodType<Prisma.PlayersGroupByArgs> = z.object({
  where: PlayersWhereInputSchema.optional(),
  orderBy: z.union([ PlayersOrderByWithAggregationInputSchema.array(),PlayersOrderByWithAggregationInputSchema ]).optional(),
  by: PlayersScalarFieldEnumSchema.array(),
  having: PlayersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayersFindUniqueArgsSchema: z.ZodType<Prisma.PlayersFindUniqueArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  where: PlayersWhereUniqueInputSchema,
}).strict() ;

export const PlayersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlayersFindUniqueOrThrowArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  where: PlayersWhereUniqueInputSchema,
}).strict() ;

export const CharacterCreateArgsSchema: z.ZodType<Prisma.CharacterCreateArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  data: z.union([ CharacterCreateInputSchema,CharacterUncheckedCreateInputSchema ]),
}).strict() ;

export const CharacterUpsertArgsSchema: z.ZodType<Prisma.CharacterUpsertArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  where: CharacterWhereUniqueInputSchema,
  create: z.union([ CharacterCreateInputSchema,CharacterUncheckedCreateInputSchema ]),
  update: z.union([ CharacterUpdateInputSchema,CharacterUncheckedUpdateInputSchema ]),
}).strict() ;

export const CharacterCreateManyArgsSchema: z.ZodType<Prisma.CharacterCreateManyArgs> = z.object({
  data: z.union([ CharacterCreateManyInputSchema,CharacterCreateManyInputSchema.array() ]),
}).strict() ;

export const CharacterDeleteArgsSchema: z.ZodType<Prisma.CharacterDeleteArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  where: CharacterWhereUniqueInputSchema,
}).strict() ;

export const CharacterUpdateArgsSchema: z.ZodType<Prisma.CharacterUpdateArgs> = z.object({
  select: CharacterSelectSchema.optional(),
  data: z.union([ CharacterUpdateInputSchema,CharacterUncheckedUpdateInputSchema ]),
  where: CharacterWhereUniqueInputSchema,
}).strict() ;

export const CharacterUpdateManyArgsSchema: z.ZodType<Prisma.CharacterUpdateManyArgs> = z.object({
  data: z.union([ CharacterUpdateManyMutationInputSchema,CharacterUncheckedUpdateManyInputSchema ]),
  where: CharacterWhereInputSchema.optional(),
}).strict() ;

export const CharacterDeleteManyArgsSchema: z.ZodType<Prisma.CharacterDeleteManyArgs> = z.object({
  where: CharacterWhereInputSchema.optional(),
}).strict() ;

export const PlayerCharactersCreateArgsSchema: z.ZodType<Prisma.PlayerCharactersCreateArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  data: z.union([ PlayerCharactersCreateInputSchema,PlayerCharactersUncheckedCreateInputSchema ]),
}).strict() ;

export const PlayerCharactersUpsertArgsSchema: z.ZodType<Prisma.PlayerCharactersUpsertArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  where: PlayerCharactersWhereUniqueInputSchema,
  create: z.union([ PlayerCharactersCreateInputSchema,PlayerCharactersUncheckedCreateInputSchema ]),
  update: z.union([ PlayerCharactersUpdateInputSchema,PlayerCharactersUncheckedUpdateInputSchema ]),
}).strict() ;

export const PlayerCharactersCreateManyArgsSchema: z.ZodType<Prisma.PlayerCharactersCreateManyArgs> = z.object({
  data: z.union([ PlayerCharactersCreateManyInputSchema,PlayerCharactersCreateManyInputSchema.array() ]),
}).strict() ;

export const PlayerCharactersDeleteArgsSchema: z.ZodType<Prisma.PlayerCharactersDeleteArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  where: PlayerCharactersWhereUniqueInputSchema,
}).strict() ;

export const PlayerCharactersUpdateArgsSchema: z.ZodType<Prisma.PlayerCharactersUpdateArgs> = z.object({
  select: PlayerCharactersSelectSchema.optional(),
  data: z.union([ PlayerCharactersUpdateInputSchema,PlayerCharactersUncheckedUpdateInputSchema ]),
  where: PlayerCharactersWhereUniqueInputSchema,
}).strict() ;

export const PlayerCharactersUpdateManyArgsSchema: z.ZodType<Prisma.PlayerCharactersUpdateManyArgs> = z.object({
  data: z.union([ PlayerCharactersUpdateManyMutationInputSchema,PlayerCharactersUncheckedUpdateManyInputSchema ]),
  where: PlayerCharactersWhereInputSchema.optional(),
}).strict() ;

export const PlayerCharactersDeleteManyArgsSchema: z.ZodType<Prisma.PlayerCharactersDeleteManyArgs> = z.object({
  where: PlayerCharactersWhereInputSchema.optional(),
}).strict() ;

export const PlayersCreateArgsSchema: z.ZodType<Prisma.PlayersCreateArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  data: z.union([ PlayersCreateInputSchema,PlayersUncheckedCreateInputSchema ]),
}).strict() ;

export const PlayersUpsertArgsSchema: z.ZodType<Prisma.PlayersUpsertArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  where: PlayersWhereUniqueInputSchema,
  create: z.union([ PlayersCreateInputSchema,PlayersUncheckedCreateInputSchema ]),
  update: z.union([ PlayersUpdateInputSchema,PlayersUncheckedUpdateInputSchema ]),
}).strict() ;

export const PlayersCreateManyArgsSchema: z.ZodType<Prisma.PlayersCreateManyArgs> = z.object({
  data: z.union([ PlayersCreateManyInputSchema,PlayersCreateManyInputSchema.array() ]),
}).strict() ;

export const PlayersDeleteArgsSchema: z.ZodType<Prisma.PlayersDeleteArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  where: PlayersWhereUniqueInputSchema,
}).strict() ;

export const PlayersUpdateArgsSchema: z.ZodType<Prisma.PlayersUpdateArgs> = z.object({
  select: PlayersSelectSchema.optional(),
  data: z.union([ PlayersUpdateInputSchema,PlayersUncheckedUpdateInputSchema ]),
  where: PlayersWhereUniqueInputSchema,
}).strict() ;

export const PlayersUpdateManyArgsSchema: z.ZodType<Prisma.PlayersUpdateManyArgs> = z.object({
  data: z.union([ PlayersUpdateManyMutationInputSchema,PlayersUncheckedUpdateManyInputSchema ]),
  where: PlayersWhereInputSchema.optional(),
}).strict() ;

export const PlayersDeleteManyArgsSchema: z.ZodType<Prisma.PlayersDeleteManyArgs> = z.object({
  where: PlayersWhereInputSchema.optional(),
}).strict() ;