import type { AppType } from '@api/app';
import { hc } from 'hono/client';

export const client = hc<AppType>('http://localhost:7071/');
