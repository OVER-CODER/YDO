<script lang="ts">
    import Header from "./Header.svelte";
    import { writable } from "svelte/store";
    import { supabase } from "$lib/supabase";
    

    async function SigninWithGoogle() {
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }
    </script>
<div>
    
    <div class=" text-6xl  font-Stint w-1/3 translate-y-28 translate-x-28 select-none">Are you bored today?</div>
    <div class=" h-[74svh] flex justify-center items-center">
        <div class="flex justify-center">
            <img src="%sveltekit.assets%/YDO.png" alt="You Deserve One!" class="h-10 w-10">
          </div>
    <div class=" w-1/3 rounded-3xl h-14 flex-col flex justify-center items-center ">
        <div  class="flex justify-center items-center ">
            <button on:click={SigninWithGoogle} class="btn btn-outline btn-primary ext-base ">Login to find you match!</button>
        </div>
    </div>
    </div>
    
</div>


<!-- src/routes/+page.svelte -->


