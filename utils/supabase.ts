import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement SUPABASE_URL et SUPABASE_KEY doivent être définies.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
