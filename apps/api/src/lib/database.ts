import * as sql from 'mssql';
import type { ISqlType, ConnectionPool, IRecordSet } from 'mssql';

interface ExecuteQueryArgs {
  query: string;
  params: {
    name: string;
    data: unknown;
    type: () => ISqlType;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger: (...args: any[]) => void;
}

export default class Database {
  private config: sql.config | string;
  private poolconnection: ConnectionPool | null = null;
  private connected = false;

  constructor(connectionsStringOrConfig: sql.config | string) {
    if (connectionsStringOrConfig === '') {
      throw new Error('Database connection string is empty');
    }
    console.log(
      `Database: config: ${JSON.stringify(connectionsStringOrConfig)}`,
    );
    this.config = connectionsStringOrConfig;
  }

  private async connect() {
    try {
      console.log(`Database connecting...${this.connected}`);
      if (this.connected === false) {
        this.poolconnection = await sql.connect(this.config);
        this.connected = true;
        console.log('Database connection successful');
      } else {
        console.log('Database already connected');
      }
    } catch (error) {
      console.error('Error config', this.config);
      console.error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
  }

  private async executeQuery<T>(args: ExecuteQueryArgs) {
    await this.connect();
    if (this.poolconnection == null) {
      args.logger('Database connection failed');
      return null;
    }
    const request = this.poolconnection.request();
    for (const { name, data, type } of args.params) {
      request.input(name, type, data);
    }
    args.logger(`Database query start`);
    const result = await request.query<T>(args.query);
    args.logger(
      `Database query end. records: ${result?.recordset?.length} affected: ${result?.rowsAffected[0]}`,
    );
    return result;
  }

  async readAll<T>(args: ExecuteQueryArgs) {
    const result = await this.executeQuery<T>(args);
    if (
      (function hasSets(sets?: unknown[]): sets is IRecordSet<T>[] {
        return sets != null && sets.length !== 0;
      })(result?.recordsets)
    ) {
      return result.recordsets[0];
    }
    return [] as T[];
  }

  async read<T>(args: ExecuteQueryArgs) {
    const result = await this.executeQuery<T>(args);
    const ret = result?.recordset[0];
    return ret;
  }

  async execute(args: ExecuteQueryArgs) {
    await this.connect();
    const result = await this.executeQuery(args);
    return result?.rowsAffected[0];
  }
  private getPreparedStatement(transaction?: sql.Transaction) {
    if (transaction) {
      return new sql.PreparedStatement(transaction);
    }
    if (this.poolconnection == null) {
      throw new Error('Database connection failed');
    }
    return new sql.PreparedStatement(this.poolconnection);
  }

  async executePreparedStatement<T>(
    args: ExecuteQueryArgs,
    transaction?: sql.Transaction,
  ) {
    await this.connect();
    const ps = this.getPreparedStatement(transaction);
    const values = args.params.reduce((acc, { name, data, type }) => {
      ps.input(name, type);
      return { ...acc, [name]: data };
    }, {});

    try {
      await ps.prepare(args.query);
      const result = await ps.execute<T>(values);
      return result;
    } catch (e) {
      args.logger(e);
      throw e;
    } finally {
      await ps.unprepare();
    }
  }
  private getRequest(transaction?: sql.Transaction) {
    if (transaction) {
      return new sql.Request(transaction);
    }
    if (this.poolconnection == null) {
      throw new Error('Database connection failed');
    }
    return new sql.Request(this.poolconnection);
  }
  async bulk(
    args: {
      table: sql.Table;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logger: (...args: any[]) => void;
    },
    transaction?: sql.Transaction,
  ) {
    await this.connect();
    const request = this.getRequest(transaction);
    const result = await request.bulk(args.table);
    return result;
  }
  private async createTransaction() {
    await this.connect();
    if (this.poolconnection == null) {
      throw new Error('Database connection failed');
    }
    const transaction = new sql.Transaction(this.poolconnection);
    return transaction;
  }

  async useTransaction(
    callback: (transaction: sql.Transaction) => Promise<void>,
  ) {
    const transaction = await this.createTransaction();
    try {
      await transaction.begin();
      await callback(transaction);
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }
}
