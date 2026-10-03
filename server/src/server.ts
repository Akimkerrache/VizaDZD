import mongoose from "mongoose";
import { app } from "./app.js";
import { env } from "./config/env.js";

async function start(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 10_000 });
  const server = app.listen(env.PORT, () => {
    console.info(`VisaDZD API listening on port ${env.PORT} (${env.NODE_ENV})`);
  });

  let shuttingDown = false;
  const shutdown = (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.info(`${signal} received; shutting down gracefully`);
    server.close(() => {
      void mongoose.disconnect().finally(() => process.exit(0));
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

void start().catch((error) => {
  console.error("Unable to start VisaDZD API:", error);
  process.exit(1);
});
