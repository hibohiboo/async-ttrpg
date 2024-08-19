import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { TransactionTestSchema } from '@db/zod';
import Database from '@api/lib/database';
import * as sql from 'mssql';
import TestDatabase from '@api/lib/testdb';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const connectionString = process.env.CONNECTION_STRING!;
const db = new Database(connectionString); // 接続を使いまわすため、関数の外で定義
const testdb = new TestDatabase(connectionString);
console.log('connection', connectionString);
const app = new Hono()
  .post(
    '/',
    zValidator('json', TransactionTestSchema.array().min(1)),
    async (c) => {
      const data = await c.req.valid('json');
      await db.useTransaction(async (transaction) => {
        const [{ TestID }] = data;
        const deleteArgs = {
          logger: console.log,
          query: 'DELETE from atrpg.TransactionTest where TestID = @TestID',
          params: [{ name: 'TestID', data: TestID, type: sql.NVarChar }],
        };

        const table = new sql.Table('atrpg.TransactionTest');
        // prettier-ignore
        table.columns.add('TestID', sql.NVarChar, { nullable: false, primary: true });
        // prettier-ignore
        table.columns.add('CreatedAt', sql.DateTimeOffset, { nullable: false, primary: true });
        data.forEach((row) => {
          table.rows.add(row.TestID, row.CreatedAt);
        });

        await db.executePreparedStatement(deleteArgs, transaction);
        await db.bulk({ table, logger: console.log }, transaction);
      });
      return c.json({});
    },
  )
  .post(
    '/delay',
    zValidator('json', TransactionTestSchema.array().min(1)),
    async (c) => {
      const data = await c.req.valid('json');

      await db.useTransaction(async (transaction) => {
        const [{ TestID }] = data;
        const deleteArgs = {
          logger: console.log,
          query: 'DELETE from atrpg.TransactionTest where TestID = @TestID',
          params: [{ name: 'TestID', data: TestID, type: sql.NVarChar }],
        };

        const table = new sql.Table('atrpg.TransactionTest');
        // prettier-ignore
        table.columns.add('TestID', sql.NVarChar, { nullable: false, primary: true });
        // prettier-ignore
        table.columns.add('CreatedAt', sql.DateTimeOffset, { nullable: false, primary: true });
        data.forEach((row) => {
          table.rows.add(row.TestID, row.CreatedAt);
        });

        await db.executePreparedStatement(deleteArgs, transaction);
        await new Promise((resolve) => setTimeout(resolve, 1000 * 5));
        await db.bulk({ table, logger: console.log }, transaction);
      });

      return c.json({});
    },
  )
  .post(
    '/lock',
    zValidator('json', TransactionTestSchema.array().min(1)),
    async (c) => {
      const data = await c.req.valid('json');
      await testdb.beginTransaction();
      try {
        const [{ TestID }] = data;
        const deleteArgs = {
          logger: console.log,
          query: 'DELETE from atrpg.TransactionTest where TestID = @TestID',
          params: [{ name: 'TestID', data: TestID, type: sql.NVarChar }],
        };

        const table = new sql.Table('atrpg.TransactionTest');
        // prettier-ignore
        table.columns.add('TestID', sql.NVarChar, { nullable: false, primary: true });
        // prettier-ignore
        table.columns.add('CreatedAt', sql.DateTimeOffset, { nullable: false, primary: true });
        data.forEach((row) => {
          table.rows.add(row.TestID, row.CreatedAt);
        });

        await testdb.executePreparedStatement(deleteArgs);
        await testdb.bulk({ table, logger: console.log });
        await testdb.commitTransaction();
        return c.json({});
      } catch (e) {
        await testdb.rollbackTransaction();
        throw e;
      }
    },
  )
  .post(
    '/lock-delay',
    zValidator('json', TransactionTestSchema.array().min(1)),
    async (c) => {
      const data = await c.req.valid('json');
      await testdb.beginTransaction();
      try {
        const [{ TestID }] = data;
        const deleteArgs = {
          logger: console.log,
          query: 'DELETE from atrpg.TransactionTest where TestID = @TestID',
          params: [{ name: 'TestID', data: TestID, type: sql.NVarChar }],
        };

        const table = new sql.Table('atrpg.TransactionTest');
        // prettier-ignore
        table.columns.add('TestID', sql.NVarChar, { nullable: false, primary: true });
        // prettier-ignore
        table.columns.add('CreatedAt', sql.DateTimeOffset, { nullable: false, primary: true });
        data.forEach((row) => {
          table.rows.add(row.TestID, row.CreatedAt);
        });

        await testdb.executePreparedStatement(deleteArgs);
        await new Promise((resolve) => setTimeout(resolve, 1000 * 10));
        await testdb.bulk({ table, logger: console.log });
        await testdb.commitTransaction();
        return c.json({});
      } catch (e) {
        await testdb.rollbackTransaction();
        throw e;
      }
    },
  );

export default app;
