import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';
import { QueueServiceClient } from '@azure/storage-queue';

// 開発環境では環境変数から接続文字列を取得
const createQueueAndBlobClientFromConnectionString = () => {
  const envList = ['AZURE_STORAGE_CONNECTION_STRING'] as const;
  envList.forEach((k) => {
    if (!process.env[k]) throw new Error(`Missing ${k} environments`);
  });
  const processEnv = process.env as Record<(typeof envList)[number], string>;
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    processEnv.AZURE_STORAGE_CONNECTION_STRING,
  );
  const queueServiceClient = QueueServiceClient.fromConnectionString(
    processEnv.AZURE_STORAGE_CONNECTION_STRING,
  );
  return { blobServiceClient, queueServiceClient };
};

export const createQueueAndBlobClient = () => {
  // 環境変数が揃っていれば本番環境とみなしてマネージドIDで接続する
  const envList = ['BLOB_QUEUE_STORAGE_ACCOUNT__accountName'] as const;
  const isProd = envList.reduce((v, k) => v && !!process.env[k], true);

  if (!isProd) {
    return createQueueAndBlobClientFromConnectionString();
  }
  const processEnv = process.env as Record<(typeof envList)[number], string>;
  const accountName = processEnv.BLOB_QUEUE_STORAGE_ACCOUNT__accountName;
  if (!accountName) {
    throw new Error('Missing BLOB_QUEUE_STORAGE_ACCOUNT_NAME env var');
  }
  const credential = new DefaultAzureCredential();
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    credential,
  );

  const queueServiceClient = new QueueServiceClient(
    `https://${accountName}.queue.core.windows.net`,
    credential,
  );

  return { blobServiceClient, queueServiceClient };
};
