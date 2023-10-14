import { supabase } from "../config/supabase";

export const addCategory = ({ name, id }) =>
  supabase
    .from("categories")
    .insert({
      name: name,
      restaurant_id: id,
    })
    .select("id, name");

export const getCategories = (id) =>
  supabase.from("categories").select("id, name").eq("restaurant_id", id);

export const deleteCategory = (id) =>
  supabase.from("categories").delete().eq("id", id);
