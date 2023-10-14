import { supabase } from "../config/supabase";

export const adminById = (id) =>
  supabase.from("admins").select("*").eq("id", id).single();
