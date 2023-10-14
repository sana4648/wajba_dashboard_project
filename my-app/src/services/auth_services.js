import { supabase } from "../config/supabase";

export const register = ({ email, password }) => {
  console.log(email);
  return supabase.auth.signUp({
    email: email,
    password: password,
  });
};

export const login = ({ email, password }) => {
  console.log(email);
  return supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
};

export const logout = () => {
  return supabase.auth.signOut();
};
