import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const notFoundHandler: RequestHandler = (request, _response, next) =>
  next(
    new HttpError(404, `Route not found: ${request.method} ${request.path}`),
  );

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      error: "Request validation failed",
      details: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ error: error.message });
    return;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "entity.too.large"
  ) {
    response.status(413).json({ error: "Request body is too large" });
    return;
  }
  const statusCode =
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
      ? error.status
      : 500;
  if (statusCode >= 500) {
    request.log.error({ err: error }, "Unhandled request error");
  }
  response
    .status(statusCode >= 400 && statusCode < 500 ? statusCode : 500)
    .json({
      error: statusCode >= 500 ? "Internal server error" : "Invalid request",
    });
};
