// import { supabase } from "../../lib/supabase";

export async function load() {
    const currentDate = new Date();
    const targetDate = new Date("2024-02-14T00:00:00");

    const data = currentDate > targetDate;
    console.log(data)
    return { 
        hi: data,
    };
}