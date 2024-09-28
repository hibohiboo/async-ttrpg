import { app, HttpResponseInit } from '@azure/functions';
import honoApp from '@api/app';
import { HttpRequest, InvocationContext } from '@azure/functions';
import type { ReadableStream } from 'node:stream/web';
import { ExecutionContext } from 'hono';

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

type LoopableHeader = {
  forEach: (callbackfn: (value: string, key: string) => void) => void;
};

function headersToObject(input: LoopableHeader): Record<string, string> {
  const headers: Record<string, string> = {};
  input.forEach((v, k) => (headers[k] = v));
  return headers;
}

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
  } as RequestInit);
};

type FetchCallback = (
  request: Request,
  env: Record<string, unknown>,
  executionCtx?: ExecutionContext,
) => Promise<Response> | Response;

function azureHonoHandler(fetch: FetchCallback) {
  return async (request: HttpRequest, _context: InvocationContext) => {
    return newAzureFunctionsResponse(
      await fetch(newRequestFromAzureFunctions(request), {
        ...process.env,
        AZURE_FUNCTIONS_CONTEXT: _context,
      }),
    );
  };
}

app.setup({
  enableHttpStream: true,
});

app.http('httpTrigger', {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  authLevel: 'anonymous',
  route: 'api/{*proxy}',
  // 第２引数のcontextはenv.AZURE_FUNCTIONS_CONTEXTに格納する
  handler: azureHonoHandler(honoApp.fetch),
});
