import tsConfigPaths from 'vite-tsconfig-paths';
import { defineWorkspace } from 'vitest/config';

const defaultTest = {
  globals: true, // vitest の API をグローバルAPI として使用できるようにする
  env: {
    TZ: 'UTC',
    HOGE: 'echo',
    SQLSERVER_NAME: 'hoge.database.windows.net',
    SQLSERVER_DB_NAME: 'hogehoge',
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
    AZURE_STORAGE_CONNECTION_STRING:
      'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;',
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
