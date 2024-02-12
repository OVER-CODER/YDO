<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";

    async function SigninWithGoogle() {
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }
    
    function optout(){
        window.location.href = "/optout";
    }

    let isInstagram = false;

    onMount(async () => {
        isInstagram = navigator.userAgent.includes("Instagram");
    });

    </script>
<div class="w-screen h-[95svh] overflow-clip flex flex-col gap-[5%]">
    <div class="flex flex-col gap-6 pl-[10%] pt-[10%]">
        <div class=" text-6xl font-Stint select-none leading-tight humfirst">Looking for a 
            <br><span class="text-pink-500 fs humfirst">match?</span></div>
        <div class=" text-xl  font-Stint select-none humfirst">Exclusive for IIITDMJ students</div>
        <div class=" text-xl text-red-500 font-Stint select-none humfirst">Use Your college IDs to login only</div>
    </div>
    {#if isInstagram}
    <div class="pl-[10%] text-xl text-red-500 font-mono select-none humfirst">Open the website in your browser instead of Instagram to login</div>
    {:else}
    <div class="flex flex-row gap-2">
    <button on:click={SigninWithGoogle} class="ml-[10%] btn btn-md btn-primary w-max humfirst">Login to find you match!</button>
    <button on:click={optout} class="btn btn-md btn-outline btn-error w-max humfirst">Opt out!</button>
    </div>
    {/if}
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


