/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvocationContext } from '@azure/functions';

export class Logger {
  private context: InvocationContext;

  constructor(context: InvocationContext) {
    this.context = context;
  }

  public log(...args: any[]): void {
    this.context.log(...args);
  }

  public trace(...args: any[]): void {
    this.context.trace(...args);
  }

  public debug(...args: any[]): void {
    this.context.debug(...args);
  }

  public info(...args: any[]): void {
    this.context.info(...args);
  }

  public warn(...args: any[]): void {
    this.context.warn(...args);
  }

  public error(...args: any[]): void {
    this.context.error(...args);
  }
}
