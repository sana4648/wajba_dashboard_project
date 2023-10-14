import { supabase } from "../config/supabase";

export const addRecipe = (data) => supabase.from("recipes").insert(data);

export const getRecipes = (id) =>
  supabase
    .from("recipes")
    .select("*, food:foods(id, name)")
    .eq("restaurant_id", id);

export const updateRecipe = (id, data) =>
  supabase.from("recipes").update(data).eq("id", id);

export const deleteRecipe = (id) =>
  supabase.from("recipes").delete().eq("id", id);
