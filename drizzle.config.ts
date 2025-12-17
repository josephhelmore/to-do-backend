import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

const ENV = process.env.NODE_ENV || "test";

dotenv.config({
  path: `src/db/.env.${ENV}`,
});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
