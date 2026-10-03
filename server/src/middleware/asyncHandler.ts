import type { RequestHandler } from "express";

type AsyncRequestHandler = (
  request: Parameters<RequestHandler>[0],
  response: Parameters<RequestHandler>[1],
) => Promise<unknown>;

export function asyncHandler(handler: AsyncRequestHandler): RequestHandler {
  return (request, response, next) => {
    void handler(request, response).catch(next);
  };
}
