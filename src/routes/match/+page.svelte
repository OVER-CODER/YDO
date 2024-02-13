<script lang="ts">
	import { onMount } from "svelte";
    import { supabase } from "$lib/supabase";
    export let data;
    console.log(data);
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
        if (chosenBy && chosenBy[0]?.chosen_by) {
            console.log(chosenBy[0].chosen_by);
            return chosenBy && chosenBy[0]?.chosen_by;
        } else {
            return [];
        }
    }

    let matches:Array<string> = [];
    let isntmatch =  1;
    async function match() {
        let lchoice = localStorage.getItem("choices");
        let choices = lchoice?JSON.parse(lchoice):[];
        let chosen_by = await getchosen();
        for(let i = 0;i<choices.length;i++){
            let temphash = await gethash(choices[i]);
            // console.log(chosen_by)
            for(let j = 0;j<chosen_by.length;j++){
                // console.log(temphash,chosen_by[j],choices[i]);
                if(temphash == chosen_by[j]){
                    const name = await supabase.from("names").select("name").eq("roll_no", choices[i].toUpperCase());
                    if (name.data && name.data[0]) {
                        isntmatch = 0;
                        matches = [...matches,name.data[0].name];
                        // console.log(matches,"hi")
                    }
                }
            }
            // console.log(matches,c)
        }
    }

    onMount(match)
</script>


{#if data.hi}
<div class="w-screen h-[100svh] flex flex-col pt-[10%] items-center mt-[10%] max-md:mt-[40%] gap-4">
    {#if isntmatch}
        <span class="text-3xl max-md:text-2xl">You have no matches :(</span>
        <span class="text-2xl max-md:text-xl">No worries we are still here for you :) </span>
        <span class="text-2xl max-md:text-xl">Fingers crossed for next year 🤞🏼 </span>
        <span class="text-2xl max-md:text-xl">We'll be back with a better site and hope you'll be back in more numbers 👀 </span>
    {:else}
        <span class="text-3xl">You have {matches.length} matches 🥳</span>
        {#each matches as m}
            <span class="text-2xl">YOU and {m} have <span class="text-2xl fs text-pink-500">matched!</span></span>
        {/each}
    {/if}
</div>
{:else}
<div class="w-screen h-[100svh] flex flex-col pt-[10%] items-center gap-4">
    <span class="text-3xl">You can see your matches on 14 feb 12:00 am</span>
</div>
{/if}


<style>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    span{
        text-align: center;
    }
    .fs{
        font-family: 'Pacifico', cursive;
    }
</style>