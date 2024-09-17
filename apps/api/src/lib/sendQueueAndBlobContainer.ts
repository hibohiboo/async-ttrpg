/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContainerClient } from '@azure/storage-blob';
import { QueueClient } from '@azure/storage-queue';

type SendQueueAndBlobArgs = {
  containerClient: ContainerClient;
  queueClient: QueueClient;
  blobPath: string;
  blobData: string;
  messageTimeToLive: number;
  logger: {
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
};

export const sendQueueAndBlobContainer = async (
  args: SendQueueAndBlobArgs,
): Promise<void> => {
  const {
    containerClient,
    queueClient,
    blobPath,
    blobData,
    messageTimeToLive,
    logger,
  } = args;

  const blobClient = containerClient.getBlockBlobClient(blobPath);
  const blobResponse = await blobClient.upload(blobData, blobData.length);

  logger.info(
    `Uploaded blob "${blobPath}". Request Id: ${blobResponse.requestId}. Client Request Id: ${blobResponse.clientRequestId}. Container: ${containerClient.containerName}`,
  );

  const queueMessage = {
    containerName: containerClient.containerName,
    blobPath,
  };

  const queueResponse = await queueClient.sendMessage(
    JSON.stringify(queueMessage),
    {
      messageTimeToLive,
    },
  );

  logger.info(
    `Sent message to queue "${queueClient.name}". Message Id: ${queueResponse.messageId}. Request Id: ${queueResponse.requestId}. Client Request Id: ${queueResponse.clientRequestId}`,
  );
};
