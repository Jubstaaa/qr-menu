import { createClient } from "@supabase/supabase-js";
import { Database } from "@qr-menu/shared-types";
import { config } from "@qr-menu/shared-config";

const supabaseUrl = config.SUPABASE_URL;
const supabaseServiceKey = config.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);
