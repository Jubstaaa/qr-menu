import { config } from "@qr-menu/shared-config";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = config.SUPABASE_URL;
const supabaseServiceKey = config.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
}
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
