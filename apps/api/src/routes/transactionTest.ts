import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { TransactionTestSchema } from '@db/zod';
import Database from '@api/lib/database';
import * as sql from 'mssql';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const connectionString = process.env.CONNECTION_STRING!;
const db = new Database(connectionString); // 接続を使いまわすため、関数の外で定義
console.log('connection', connectionString);
const app = new Hono()
  .post(
    '/',
    zValidator('json', TransactionTestSchema.array().min(1)),
    async (c) => {
      const data = await c.req.valid('json');
      const transaction = await db.beginTransaction();
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

        await db.executePreparedStatement(deleteArgs, transaction);
        await db.bulk({ table, logger: console.log }, transaction);
        await transaction.commit();
        return c.json({});
      } catch (e) {
        await transaction.rollback();
        throw e;
      }
    },
  )
  .post(
    '/delay',
    zValidator('json', TransactionTestSchema.array().min(1)),
    async (c) => {
      const data = await c.req.valid('json');
      const transaction = await db.beginTransaction();
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

        await db.executePreparedStatement(deleteArgs, transaction);
        await new Promise((resolve) => setTimeout(resolve, 1000 * 5));
        await db.bulk({ table, logger: console.log }, transaction);
        await transaction.commit();
        return c.json({});
      } catch (e) {
        await transaction.rollback();
        throw e;
      }
    },
  );

export default app;
