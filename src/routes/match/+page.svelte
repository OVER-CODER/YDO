<script lang="ts">
	import { onMount } from "svelte";
    import { supabase } from "$lib/supabase";

    async function gethash(item: string) {
        const msgUint8 = new TextEncoder().encode(item);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    }
    async function getchosen() {
        const userdata =  JSON.parse(localStorage.user);
        const cur_roll = userdata.email.split("@")[0];
        const { data } = await supabase
            .from("names")
            .select("chosen_by")
            .eq("roll_no", cur_roll?.toUpperCase());

        const chosenBy = data;
        console.log(chosenBy[0].chosen_by)
        return chosenBy[0].chosen_by;
    }

    let matches = "";
    async function match() {
        let lchoice = localStorage.getItem("choices");
        let choices = lchoice?JSON.parse(lchoice):[];
        let chosen_by = await getchosen();
        for(let i = 0;i<choices.length;i++){
            let temphash = await gethash(choices[i]);
            for(let j = 0;j<chosen_by.length;j++){
                console.log(temphash,chosen_by[j]);
                if(temphash == chosen_by[j]){
                    console.log(choices[i]);
                    matches += " " + choices[i];
                }
            }
        }
    }

    onMount(match)
</script>

<span>
{matches}
</span>