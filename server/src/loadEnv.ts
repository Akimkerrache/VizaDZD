import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

// Resolve from this module so both `tsx src/server.ts` and `node dist/server.js`
// always load the private server/.env file, regardless of the shell's cwd.
const envFilePath = fileURLToPath(new URL("../.env", import.meta.url));
const result = dotenv.config({ path: envFilePath });

if (result.error && process.env.NODE_ENV !== "production") {
  console.warn(`Unable to load server environment file at ${envFilePath}`);
}
