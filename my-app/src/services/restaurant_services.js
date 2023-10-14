import { supabase } from "../config/supabase";

export const updateRestaurant = (data) =>
  supabase.from("restaurants").update(data).eq("id", data.id);

export const restaurantByOwner = (id) =>
  supabase.from("restaurants").select("*").eq("owner_id", id).limit(1);

export const checkIfRestaurantExists = async (name) => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("name", name)
    .single();
  if (error) {
    console.log(error);
    return false;
  } else {
    if (data) {
      return true;
    } else {
      return false;
    }
  }
};


export const getMenus = (id) =>
  supabase.from("menus").select("id, name").eq("restaurant_id", id);
