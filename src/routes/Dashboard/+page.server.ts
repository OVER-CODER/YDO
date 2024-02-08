import { goto } from "$app/navigation";
import { supabase } from "../../lib/supabase";

export async function load() {
  const { data } = await supabase.from("names").select("roll_no, name");
  const userdata=  await supabase.auth.getUser()
  console.log(data)
  return {
    name: data ?? [],
  };
}