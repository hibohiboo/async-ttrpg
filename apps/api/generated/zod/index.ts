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

export const TransactionTestScalarFieldEnumSchema = z.enum(['TestID','CreatedAt']);

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
// TRANSACTION TEST SCHEMA
/////////////////////////////////////////

export const TransactionTestSchema = z.object({
  TestID: z.string(),
  CreatedAt: z.coerce.date(),
})

export type TransactionTest = z.infer<typeof TransactionTestSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CHARACTER
//------------------------------------------------------

export const CharacterSelectSchema: z.ZodType<Prisma.CharacterSelect> = z.object({
  CharacterID: z.boolean().optional(),
  CharacterName: z.boolean().optional(),
}).strict()

// TRANSACTION TEST
//------------------------------------------------------

export const TransactionTestSelectSchema: z.ZodType<Prisma.TransactionTestSelect> = z.object({
  TestID: z.boolean().optional(),
  CreatedAt: z.boolean().optional(),
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

export const TransactionTestWhereInputSchema: z.ZodType<Prisma.TransactionTestWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionTestWhereInputSchema),z.lazy(() => TransactionTestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionTestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionTestWhereInputSchema),z.lazy(() => TransactionTestWhereInputSchema).array() ]).optional(),
  TestID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CreatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TransactionTestOrderByWithRelationInputSchema: z.ZodType<Prisma.TransactionTestOrderByWithRelationInput> = z.object({
  TestID: z.lazy(() => SortOrderSchema).optional(),
  CreatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionTestWhereUniqueInputSchema: z.ZodType<Prisma.TransactionTestWhereUniqueInput> = z.object({
  TestID_CreatedAt: z.lazy(() => TransactionTestTestIDCreatedAtCompoundUniqueInputSchema)
})
.and(z.object({
  TestID_CreatedAt: z.lazy(() => TransactionTestTestIDCreatedAtCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => TransactionTestWhereInputSchema),z.lazy(() => TransactionTestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionTestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionTestWhereInputSchema),z.lazy(() => TransactionTestWhereInputSchema).array() ]).optional(),
  TestID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  CreatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const TransactionTestOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionTestOrderByWithAggregationInput> = z.object({
  TestID: z.lazy(() => SortOrderSchema).optional(),
  CreatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TransactionTestCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionTestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionTestMinOrderByAggregateInputSchema).optional()
}).strict();

export const TransactionTestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TransactionTestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionTestScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionTestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionTestScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionTestScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionTestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  TestID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  CreatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
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

export const TransactionTestCreateInputSchema: z.ZodType<Prisma.TransactionTestCreateInput> = z.object({
  TestID: z.string(),
  CreatedAt: z.coerce.date()
}).strict();

export const TransactionTestUncheckedCreateInputSchema: z.ZodType<Prisma.TransactionTestUncheckedCreateInput> = z.object({
  TestID: z.string(),
  CreatedAt: z.coerce.date()
}).strict();

export const TransactionTestUpdateInputSchema: z.ZodType<Prisma.TransactionTestUpdateInput> = z.object({
  TestID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionTestUncheckedUpdateInputSchema: z.ZodType<Prisma.TransactionTestUncheckedUpdateInput> = z.object({
  TestID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionTestCreateManyInputSchema: z.ZodType<Prisma.TransactionTestCreateManyInput> = z.object({
  TestID: z.string(),
  CreatedAt: z.coerce.date()
}).strict();

export const TransactionTestUpdateManyMutationInputSchema: z.ZodType<Prisma.TransactionTestUpdateManyMutationInput> = z.object({
  TestID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionTestUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TransactionTestUncheckedUpdateManyInput> = z.object({
  TestID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  CreatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const TransactionTestTestIDCreatedAtCompoundUniqueInputSchema: z.ZodType<Prisma.TransactionTestTestIDCreatedAtCompoundUniqueInput> = z.object({
  TestID: z.string(),
  CreatedAt: z.coerce.date()
}).strict();

export const TransactionTestCountOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionTestCountOrderByAggregateInput> = z.object({
  TestID: z.lazy(() => SortOrderSchema).optional(),
  CreatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionTestMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionTestMaxOrderByAggregateInput> = z.object({
  TestID: z.lazy(() => SortOrderSchema).optional(),
  CreatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionTestMinOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionTestMinOrderByAggregateInput> = z.object({
  TestID: z.lazy(() => SortOrderSchema).optional(),
  CreatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
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

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
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

export const TransactionTestFindFirstArgsSchema: z.ZodType<Prisma.TransactionTestFindFirstArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  where: TransactionTestWhereInputSchema.optional(),
  orderBy: z.union([ TransactionTestOrderByWithRelationInputSchema.array(),TransactionTestOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionTestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionTestScalarFieldEnumSchema,TransactionTestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionTestFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TransactionTestFindFirstOrThrowArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  where: TransactionTestWhereInputSchema.optional(),
  orderBy: z.union([ TransactionTestOrderByWithRelationInputSchema.array(),TransactionTestOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionTestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionTestScalarFieldEnumSchema,TransactionTestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionTestFindManyArgsSchema: z.ZodType<Prisma.TransactionTestFindManyArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  where: TransactionTestWhereInputSchema.optional(),
  orderBy: z.union([ TransactionTestOrderByWithRelationInputSchema.array(),TransactionTestOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionTestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionTestScalarFieldEnumSchema,TransactionTestScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionTestAggregateArgsSchema: z.ZodType<Prisma.TransactionTestAggregateArgs> = z.object({
  where: TransactionTestWhereInputSchema.optional(),
  orderBy: z.union([ TransactionTestOrderByWithRelationInputSchema.array(),TransactionTestOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionTestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TransactionTestGroupByArgsSchema: z.ZodType<Prisma.TransactionTestGroupByArgs> = z.object({
  where: TransactionTestWhereInputSchema.optional(),
  orderBy: z.union([ TransactionTestOrderByWithAggregationInputSchema.array(),TransactionTestOrderByWithAggregationInputSchema ]).optional(),
  by: TransactionTestScalarFieldEnumSchema.array(),
  having: TransactionTestScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TransactionTestFindUniqueArgsSchema: z.ZodType<Prisma.TransactionTestFindUniqueArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  where: TransactionTestWhereUniqueInputSchema,
}).strict() ;

export const TransactionTestFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TransactionTestFindUniqueOrThrowArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  where: TransactionTestWhereUniqueInputSchema,
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

export const TransactionTestCreateArgsSchema: z.ZodType<Prisma.TransactionTestCreateArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  data: z.union([ TransactionTestCreateInputSchema,TransactionTestUncheckedCreateInputSchema ]),
}).strict() ;

export const TransactionTestUpsertArgsSchema: z.ZodType<Prisma.TransactionTestUpsertArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  where: TransactionTestWhereUniqueInputSchema,
  create: z.union([ TransactionTestCreateInputSchema,TransactionTestUncheckedCreateInputSchema ]),
  update: z.union([ TransactionTestUpdateInputSchema,TransactionTestUncheckedUpdateInputSchema ]),
}).strict() ;

export const TransactionTestCreateManyArgsSchema: z.ZodType<Prisma.TransactionTestCreateManyArgs> = z.object({
  data: z.union([ TransactionTestCreateManyInputSchema,TransactionTestCreateManyInputSchema.array() ]),
}).strict() ;

export const TransactionTestDeleteArgsSchema: z.ZodType<Prisma.TransactionTestDeleteArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  where: TransactionTestWhereUniqueInputSchema,
}).strict() ;

export const TransactionTestUpdateArgsSchema: z.ZodType<Prisma.TransactionTestUpdateArgs> = z.object({
  select: TransactionTestSelectSchema.optional(),
  data: z.union([ TransactionTestUpdateInputSchema,TransactionTestUncheckedUpdateInputSchema ]),
  where: TransactionTestWhereUniqueInputSchema,
}).strict() ;

export const TransactionTestUpdateManyArgsSchema: z.ZodType<Prisma.TransactionTestUpdateManyArgs> = z.object({
  data: z.union([ TransactionTestUpdateManyMutationInputSchema,TransactionTestUncheckedUpdateManyInputSchema ]),
  where: TransactionTestWhereInputSchema.optional(),
}).strict() ;

export const TransactionTestDeleteManyArgsSchema: z.ZodType<Prisma.TransactionTestDeleteManyArgs> = z.object({
  where: TransactionTestWhereInputSchema.optional(),
}).strict() ;