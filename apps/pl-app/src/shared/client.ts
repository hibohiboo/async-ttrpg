import { hc } from 'hono/client';
import type { AppType } from '@api/app';

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const client = hc<AppType>(`${import.meta.env.VITE_API_URL}`);
