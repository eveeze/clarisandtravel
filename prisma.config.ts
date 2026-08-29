
import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "prisma/config";

const dbUrl =
  process.env.DATABASE_URL ??
  "postgresql://placeholder:placeholder@localhost:5432/postgres";
const directUrl = process.env.DIRECT_URL ?? dbUrl;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  engine: "classic",
  datasource: {
    url: dbUrl,
    directUrl,
  },
});
