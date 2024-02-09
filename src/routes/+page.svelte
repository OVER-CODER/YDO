<script lang="ts">
	import Header from './Header.svelte';
	import Login from './Login.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Rose from './Rose.svelte';

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
		console.log(data);
	}

	onMount(checkuser);
</script>

<main class="h-[100svh] overflow-clip w-[100vw] relative">
	<Header />
	<Rose />
	<Login />
</main>

<style>
</style>
