import { supabase } from "../config/supabase";

export const getMenuByRestaurant = (id) =>
  supabase.from("menu").select("*").eq("restaurant_id", id).limit(1);
