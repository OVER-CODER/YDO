<script lang="ts">
    import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
    let loggedin = false;
    let optbutt:HTMLButtonElement;
    async function SigninWithGoogle() {
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options:{
                redirectTo:  `${window.location.origin}/optout`,
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

    async function DeleteEntry(item: string, n: number,curruser: string) {
		const msgUint8 = new TextEncoder().encode(curruser?.toUpperCase());
		const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
		console.log(item);
		let tempdata = await supabase
			.from('names')
			.select('chosen_by')
			.eq('roll_no', item?.toUpperCase());
		// console.log(tempdata.data,tempdata.data?.length);
		let tchoice = [];
		console.log(tempdata.data);
		if (tempdata.data) {
			tchoice = tempdata.data[0].chosen_by ? tempdata.data[0].chosen_by : [];
		}
		if(tchoice.includes(hashHex)){
			var index = tchoice.indexOf(hashHex);
			if (index !== -1) {
				tchoice.splice(index, 1);
			}
		}
		console.log(tchoice);
		const { error } = await supabase
			.from('names')
			.update({ chosen_by: tchoice })
			.eq('roll_no', item?.toUpperCase());
		console.log(error);
		let nchoice = JSON.parse(localStorage.choices);
		console.log(nchoice);
		nchoice[n] = "";
		localStorage.setItem('choices', JSON.stringify(nchoice));
	}

    async function optout() {
        if(localStorage.user){
            // console.log("bkl")
            // console.log(JSON.parse(localStorage.user).email.split("@")[0].toUpperCase(),JSON.parse(localStorage.user).email);
            const {error} = await supabase.from("names").delete().eq("roll_no",JSON.parse(localStorage.user).email.split("@")[0].toUpperCase());
            await supabase.auth.signOut();
            const wtf = await supabase.from("blacklist").insert({email:JSON.parse(localStorage.user).email});
            // console.log(wtf,error)
            optbutt.innerHTML = "Opted out";
            optbutt.disabled = true;
            if(localStorage.choices){
                let nchoice = JSON.parse(localStorage.choices);
                for(let i = 0;i<nchoice.length;i++){
                    if(nchoice[i]){
                        await DeleteEntry(nchoice[i],i,JSON.parse(localStorage.user).email.split("@")[0].toUpperCase());
                    }
                }
            }
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


