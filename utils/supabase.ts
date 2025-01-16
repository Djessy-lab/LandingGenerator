import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();
const supabaseUrl = config.public.SUPABASE_URL;
const supabaseKey = config.public.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement SUPABASE_URL et SUPABASE_KEY doivent être définies.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
