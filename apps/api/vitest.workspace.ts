import tsConfigPaths from 'vite-tsconfig-paths';
import { defineWorkspace } from 'vitest/config';

const defaultTest = {
  globals: true,
  env: {
    TZ: 'UTC',
    SQLSERVER_NAME: 'hoge.database.windows.net',
    SQLSERVER_DB_NAME: 'hogehoge',
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
    HOGE: 'echo',
  },
};

const defaultSettings = {
  plugins: [tsConfigPaths()],
  test: { ...defaultTest },
};

export default defineWorkspace([
  {
    ...defaultSettings,
    test: {
      ...defaultTest,
      name: 'unit-test',
      include: ['**/*.test.ts'],
      exclude: ['**/*.az.test.ts'],
    },
  },
  {
    ...defaultSettings,
    test: {
      ...defaultTest,
      name: 'azurite-test',
      include: ['**/*.az.test.ts'],
    },
  },
]);
