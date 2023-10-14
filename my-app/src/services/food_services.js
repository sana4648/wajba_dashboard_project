import { supabase } from "../config/supabase";

export const addFood = (data) => supabase.from("foods").insert(data);

export const getFoods = (id, perPage) =>
  supabase
    .from("foods")
    .select("*, category:categories(id, name)")
    .eq("restaurant_id", id)
    .limit(perPage);


    export const deleteFood = (id) =>
      supabase.from("foods").delete().eq("id", id);