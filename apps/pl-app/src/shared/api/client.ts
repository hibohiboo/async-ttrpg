import { hc } from 'hono/client';
import type { AppType } from '@api/app';
import { backendBaseUrl } from '../config';

export const apiClient = hc<AppType>(backendBaseUrl);
export type ApiClient = typeof apiClient;
