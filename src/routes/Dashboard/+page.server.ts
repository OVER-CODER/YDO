import { supabase } from "../../lib/supabase";

export async function load() {
  const { data } = await supabase.from("names").select("roll_no, name");
  // const userdata=  await supabase.auth.getUser()
  // console.log(userdata)
  // console.log(data)
  const currentDate = new Date();
  const targetDate = new Date("2024-02-14T00:00:00");

  const hehe = true;
  return {
    name: data ?? [],
    show: hehe,
  };
}