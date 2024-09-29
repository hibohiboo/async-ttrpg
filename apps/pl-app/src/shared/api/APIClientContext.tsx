import { createContext, ReactNode, useMemo } from 'react';
import { ApiClient, apiClient } from './client';

export const APIClientContext = createContext<{ client: ApiClient }>({
  client: apiClient,
});

export function APIClientProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({ client: apiClient }), []);
  return (
    <APIClientContext.Provider value={value}>
      {children}
    </APIClientContext.Provider>
  );
}
