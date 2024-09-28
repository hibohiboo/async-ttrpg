import {
  HttpResponseInit,
  HttpRequest,
  InvocationContext,
} from '@azure/functions';
import { ExecutionContext } from 'hono';
import type { ReadableStream } from 'node:stream/web';

type LoopableHeader = {
  forEach: (callbackfn: (value: string, key: string) => void) => void;
};

function headersToObject(input: LoopableHeader): Record<string, string> {
  const headers: Record<string, string> = {};
  input.forEach((v, k) => {
    headers[k] = v;
  });
  return headers;
}
const streamToAsyncIterator = (readable: ReadableStream<Uint8Array>) => {
  const reader = readable.getReader();
  return {
    next() {
      return reader.read();
    },
    return() {
      return reader.releaseLock();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  } as AsyncIterableIterator<Uint8Array>;
};

const newAzureFunctionsResponse = (response: Response): HttpResponseInit => {
  const returnBase = {
    status: response.status,
    headers: headersToObject(response.headers),
  };
  if (!response.body) return returnBase;

  return {
    ...returnBase,
    body: streamToAsyncIterator(
      // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/65542
      response.body as unknown as ReadableStream<Uint8Array>,
    ),
  };
};

const newRequestFromAzureFunctions = (request: HttpRequest): Request => {
  const hasBody = !['GET', 'HEAD'].includes(request.method);
  const requestInit = {
    method: request.method,
    headers: headersToObject(request.headers),
  };
  if (!hasBody) {
    return new Request(request.url, requestInit);
  }

  return new Request(request.url, {
    ...requestInit,
    body: request.body,
    duplex: 'half',
    // フロントエンドのトランスパイルで型エラーがでるのでasで回避
    // eslint-disable-next-line no-undef
  } as RequestInit);
};

type FetchCallback = (
  request: Request,
  env: Record<string, unknown>,
  executionCtx?: ExecutionContext,
) => Promise<Response> | Response;

export function azureHonoHandler(fetch: FetchCallback) {
  return async (request: HttpRequest, _context: InvocationContext) =>
    newAzureFunctionsResponse(
      await fetch(newRequestFromAzureFunctions(request), {
        ...process.env,
        AZURE_FUNCTIONS_CONTEXT: _context,
      }),
    );
}
