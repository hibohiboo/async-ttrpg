import { testClient } from 'hono/testing';
import { vi } from 'vitest';
import app from '@api/app';

export const client = testClient(app, {
  AZURE_FUNCTIONS_CONTEXT: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    log: vi.fn(),
  },
});
