<script lang="ts">
    import Header from "./Header.svelte";
    import Petels from "./Petals.svelte";
    import { writable } from "svelte/store";
    import { supabase } from "$lib/supabase";
    

    async function SigninWithGoogle() {
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }
    </script>
<div class="w-screen h-[95svh] bg-base-200 overflow-clip flex flex-col gap-[5%] humfirst">
    <div class="flex flex-col gap-6 pl-[10%] pt-[10%]">
        <div class=" text-6xl font-Stint select-none leading-tight humfirst">Looking for a 
            <br><span class="text-pink-500 fs humfirst">match?</span></div>
        <div class=" text-xl  font-Stint select-none humfirst">Exclusive for IIITDMJ students</div>
        <div class=" text-xl text-red-500 font-Stint select-none humfirst">Use Your college IDs to login only</div>
    </div>
    <button on:click={SigninWithGoogle} class="ml-[10%] btn btn-md btn-primary w-max humfirst">Login to find you match!</button>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    .humfirst{
        z-index: +100;
    }
    .fs{
        font-family: 'Pacifico', cursive;
    }
</style>

<!-- src/routes/+page.svelte -->


