import "./loadEnv.js";
import mongoose from "mongoose";
import { app } from "./app.js";

async function start(): Promise<void> {
  const port = Number(process.env.PORT || 4000);
  const server = app.listen(port, () => {
    console.info(
      `VisaDZD API listening on port ${port} (${process.env.NODE_ENV ?? "development"})`,
    );
  });

  let shuttingDown = false;
  const shutdownController = new AbortController();
  void connectDatabaseUntilReady(shutdownController.signal);

  const shutdown = (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    shutdownController.abort();
    console.info(`${signal} received; shutting down gracefully`);
    server.close(() => {
      void mongoose.disconnect().finally(() => process.exit(0));
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

async function connectDatabaseUntilReady(signal: AbortSignal): Promise<void> {
  let retryDelayMs = 1_000;

  while (!signal.aborted && mongoose.connection.readyState !== 1) {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn(
        "MONGODB_URI is not set in server/.env; database connection will retry",
      );
      await waitForRetry(retryDelayMs, signal);
      retryDelayMs = Math.min(retryDelayMs * 2, 30_000);
      continue;
    }
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 3_000,
        connectTimeoutMS: 3_000,
      });
      console.info("MongoDB connected; application submissions are enabled");
      return;
    } catch (error) {
      if (signal.aborted) return;
      console.warn(
        `MongoDB is unavailable; API remains online and will retry in ${retryDelayMs / 1_000}s`,
        error instanceof Error ? error.message : error,
      );
      await waitForRetry(retryDelayMs, signal);
      retryDelayMs = Math.min(retryDelayMs * 2, 30_000);
    }
  }
}

function waitForRetry(delayMs: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const timer = setTimeout(finish, delayMs);
    signal.addEventListener("abort", finish, { once: true });
  });
}
void start().catch((error) => {
  console.error("Unable to start VisaDZD API:", error);
  process.exit(1);
});
