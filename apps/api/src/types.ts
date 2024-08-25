import { InvocationContext } from '@azure/functions';

type Bindings = {
  AZURE_FUNCTIONS_CONTEXT: InvocationContext;
};
export type AppContext = { Bindings: Bindings };
