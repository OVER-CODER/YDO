<script lang="ts">
	import Error from './Error.svelte'
	import Header from './Header.svelte';
	import Login from './Login.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Rose from './Rose.svelte';
	let c = false;
	async function checkuser() {
		if (localStorage.user) {
			window.location.href = '/Dashboard';
			return;
		}
		const { data, error } = await supabase.auth.getSession();
		if (data.session?.user) {
			localStorage.setItem('user', JSON.stringify(data.session.user));
			window.location.href = '/Dashboard';
		}

		if(window.location.href.includes("Error+creating+identity")){
			c =true;
		}
		console.log(data);
	}

	onMount(checkuser);
</script>

<main class="h-[100svh] overflow-clip w-[100vw] relative">
	<Header />
	<Rose />
	<Login />
	{#if c}
	<Error/>
	{/if}
</main>

<style>
</style>
