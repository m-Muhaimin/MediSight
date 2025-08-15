// server/db/client.ts
import { createClient } from "@supabase/supabase-js";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";


export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const connectionString = process.env.SUPABASE_DB_URL!;
const sql = postgres(connectionString, { ssl: "require" });

export const db = drizzle(sql);