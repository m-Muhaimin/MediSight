import { createClient } from "@supabase/supabase-js";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import dotenv from "dotenv";

// 1. Load environment variables
dotenv.config({ path: '.env' }); // or '../../.env' if nested

// 2. Validate environment variables
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// 3. Initialize Supabase client
export const supabase = createClient(
  getEnvVar('SUPABASE_URL'),
  getEnvVar('SUPABASE_ANON_KEY'),
  {
    auth: {
      persistSession: false // Recommended for server-side usage
    }
  }
);

// 4. Initialize Drizzle ORM
export const db = drizzle(
  postgres(getEnvVar('SUPABASE_DB_URL'), 
  { ssl: "require" }
);