/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvocationContext } from '@azure/functions';

type Bindings = {
  AZURE_FUNCTIONS_CONTEXT: InvocationContext;
};
type Logger = {
  log(...args: any[]): void;
  trace(...args: any[]): void;
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
};

export type AppContext = {
  Bindings: Bindings;
  Variables: {
    services: {
      logger: Logger;
    };
  };
};
