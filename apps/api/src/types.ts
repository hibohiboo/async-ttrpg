import { InvocationContext } from '@azure/functions';

export type Bindings = {
  AZURE_FUNCTIONS_CONTEXT: InvocationContext;
};
