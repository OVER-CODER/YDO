import { goto } from "$app/navigation";
import { supabase } from "../../lib/supabase";

export async function load() {
  const { data } = await supabase.from("names").select();
  const userdata=  await supabase.auth.getUser()
  return {
    names: data ?? [],
  };
}