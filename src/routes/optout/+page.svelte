<script lang="ts">
    import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
    let loggedin = false;
    let optbutt:HTMLButtonElement;
    async function SigninWithGoogle() {
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options:{
                redirectTo: 'http://localhost:5173/optout',
            },
        }
        )
    }

    async function checkuser() {
        const { data, error } = await supabase.auth.getSession();
		if (data.session?.user) {
            loggedin = true;
			localStorage.setItem('user', JSON.stringify(data.session.user));
		}
    }

    async function optout() {
        if(localStorage.user){
            console.log("bkl")
            console.log(JSON.parse(localStorage.user).email.split("@")[0].toUpperCase(),JSON.parse(localStorage.user).email);
            const {error} = await supabase.from("names").delete().eq("roll_no",JSON.parse(localStorage.user).email.split("@")[0].toUpperCase());
            await supabase.auth.signOut();
            const wtf = await supabase.from("blacklist").insert({email:JSON.parse(localStorage.user).email});
            console.log(wtf,error)
            optbutt.innerHTML = "Opted out";
            optbutt.disabled = true;
            localStorage.clear();
            return;
        }
    }

    onMount(checkuser);
</script>

<div class="w-screen h-[95svh] overflow-clip flex flex-col gap-[5%]">
    <div class="flex flex-col gap-6 pl-[10%] pt-[10%]">
        <div class=" text-6xl font-Stint select-none leading-tight humfirst">Don't wanna
            <br><span class="text-pink-500 fs humfirst">match?</span></div>
        <div class=" text-xl  font-Stint select-none humfirst">We get it.</div>
        <div class=" text-xl text-red-500 font-Stint select-none humfirst">Use Your college IDs to login only</div>
        <div class=" text-xl text-red-500 font-Stint select-none humfirst">Optout is irreversible Once you optout you cannot join again.</div>        
    </div>
    {#if !loggedin}
    <button on:click={()=>{SigninWithGoogle()}} class="ml-[10%] btn btn-md btn-primary w-max humfirst">Login</button>
    {:else}
    <button bind:this={optbutt} on:click={()=>{optout()}} class="ml-[10%] btn btn-md btn-primary w-max humfirst">Optout</button>
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


