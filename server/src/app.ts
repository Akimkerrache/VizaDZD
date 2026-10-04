import "./loadEnv.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { rateLimit } from "express-rate-limit";
import mongoose from "mongoose";
import countriesRouter from "./routes/countries.js";
import applicationsRouter from "./routes/applications.js";
import {
  errorHandler,
  HttpError,
  notFoundHandler,
} from "./middleware/errors.js";

export const app = express();
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

const allowedOrigins = (process.env.CLIENT_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new HttpError(403, "Origin is not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    maxAge: 600,
  }),
);
app.use(
  pinoHttp({
    redact: ["req.headers.authorization", "req.headers.cookie"],
    autoLogging: { ignore: (request) => request.url === "/api/health" },
  }),
);
app.use(express.json({ limit: "20kb", strict: true }));
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 120,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
);

app.get("/api/health", (_request, response) => {
  const database =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  response.status(database === "connected" ? 200 : 503).json({
    status: database === "connected" ? "ok" : "degraded",
    database,
    service: "visadzd-api",
    timestamp: new Date().toISOString(),
  });
});
app.use("/api/countries", countriesRouter);
app.use("/api/applications", applicationsRouter);
app.use(notFoundHandler);
app.use(errorHandler);
