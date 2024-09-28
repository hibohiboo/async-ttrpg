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

export default class TestDatabase {
  private config: sql.config | string;
  private poolconnection: ConnectionPool | null = null;
  private connected = false;
  private transaction: sql.Transaction | null = null;

  constructor(connectionsString: sql.config | string) {
    if (connectionsString === '') {
      throw new Error('Database connection string is empty');
    }
    console.log(`Database: config: ${JSON.stringify(connectionsString)}`);
    this.config = connectionsString;
  }

  private async connect() {
    try {
      console.log(`Database connecting...${this.connected}`);
      if (this.connected === false) {
        this.poolconnection = await sql.connect(this.config);
        this.connected = true;
        console.log(
          'Database connection successful',
          this.poolconnection.pool.numUsed(),
        );
      } else {
        console.log(
          'Database already connected',
          this.poolconnection?.pool.numUsed(),
        );
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
  private getPreparedStatement() {
    if (this.transaction) {
      console.log('ps transaction');
      return new sql.PreparedStatement(this.transaction);
    }
    if (this.poolconnection == null) {
      throw new Error('Database connection failed');
    }
    return new sql.PreparedStatement(this.poolconnection);
  }

  async executePreparedStatement<T>(args: ExecuteQueryArgs) {
    await this.connect();
    const ps = this.getPreparedStatement();
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
  private getRequest() {
    if (this.transaction) {
      return new sql.Request(this.transaction);
    }
    if (this.poolconnection == null) {
      throw new Error('Database connection failed');
    }
    return new sql.Request(this.poolconnection);
  }
  async bulk(args: {
    table: sql.Table;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logger: (...args: any[]) => void;
  }) {
    await this.connect();
    const request = this.getRequest();
    const result = await request.bulk(args.table);
    return result;
  }
  async beginTransaction() {
    await this.connect();
    if (this.poolconnection == null) {
      throw new Error('Database connection failed');
    }
    this.transaction = new sql.Transaction(this.poolconnection);
    await this.transaction.begin();
  }
  async commitTransaction() {
    if (this.transaction == null) {
      throw new Error('Transaction not started');
    }
    await this.transaction.commit();
    this.transaction = null;
  }
  async rollbackTransaction() {
    if (this.transaction == null) {
      console.warn('Transaction not started');
      return;
    }
    await this.transaction.rollback();
    this.transaction = null;
  }
}
