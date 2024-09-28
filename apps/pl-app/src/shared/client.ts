import type { AppType } from '@api/app';
import { hc } from 'hono/client';

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const client = hc<AppType>(`${import.meta.env.VITE_API_URL}`);
