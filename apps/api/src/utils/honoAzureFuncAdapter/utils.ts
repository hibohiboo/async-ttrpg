/* eslint-disable @typescript-eslint/no-explicit-any */
export const streamToAsyncIterator = (
  readable: any, // ReadableStream<Uint8Array> | null,
) => {
  if (readable == null) return null;
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
  // eslint-disable-next-line unused-imports/no-unused-vars
  forEach: (callbackfn: (value: string, key: string) => void) => void;
};

export function headersToObject(input: LoopableHeader): Record<string, string> {
  const headers: Record<string, string> = {};
  input.forEach((v, k) => (headers[k] = v));
  return headers;
}
