/* eslint-disable unused-imports/no-unused-vars */
import { HttpRequest, InvocationContext } from "@azure/functions";
import { newRequestFromAzureFunctions } from "./request";
import { newAzureFunctionsResponse } from "./response";

// https://github.com/Marplex/hono-azurefunc-adapter/blob/main/src/response.ts
export type FetchCallback = (
  request: Request,
  env: Record<string, unknown>
) => Promise<Response> | Response;

export function azureHonoHandler(fetch: FetchCallback) {
  // TODO: contextを渡す手段は何かないか（ログをここから取りたい）
  return async (request: HttpRequest, _context: InvocationContext) =>
    newAzureFunctionsResponse(
      await fetch(newRequestFromAzureFunctions(request), process.env)
    );
}