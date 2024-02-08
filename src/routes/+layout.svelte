<!-- <script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p class="font-sans">Made with 💖 by Overcoder</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style> -->
<!-- 
<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import {supabaseClient } from "$lib/lib/supabase";
	import {onMount} from 'svelte';
	import '../app.postcss';

	onMount(() => {
		const {
			data:{ subscription }
		} = supabaseClient.auth.onAuthStateChange(()=>{
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});
</script> -->

<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import "./styles.css"
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

</script>

<svelte:head>
	<title>You Deserve One!</title>
</svelte:head>

<div class="container">
	<slot />
</div>