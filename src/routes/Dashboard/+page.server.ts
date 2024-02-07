import { supabase } from "../../lib/supabase";

export async function load() {
  const { data } = await supabase.from("names").select();
  return {
    names: data ?? [],
  };
}