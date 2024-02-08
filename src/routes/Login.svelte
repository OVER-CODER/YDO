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
<div class="h-[92svh] w-screen bg-base-200">
    
    <div class=" text-6xl  font-Stint w-1/3 translate-y-28 translate-x-28 select-none">Looking for a match?</div>
    
    <div class=" h-[74svh] flex justify-center items-center">     
    <div class=" w-1/3 rounded-3xl h-14 flex-col flex justify-center items-center ">
        <div  class="flex justify-center items-center ">
            <button on:click={SigninWithGoogle} class="btn btn-outline btn-md btn-primary ext-base ">Login to find you match!</button>
        </div>
    </div>
    </div>
    
</div>


<!-- src/routes/+page.svelte -->


