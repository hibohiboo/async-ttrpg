import type { AppType } from '@api/appType';
import { hc } from 'hono/client';
import { backendBaseUrl } from '../config';

export const apiClient = hc<AppType>(backendBaseUrl);
export type ApiClient = typeof apiClient;
