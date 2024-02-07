<script lang="ts">
	import Header from "./Header.svelte";
	import Login from "./Login.svelte"
	import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";

	async function checkuser() {
		const { data, error } = await supabase.auth.getUser();
		if(data.user){
			console.log(data.user)
			window.location.href = "/Dashboard"
			localStorage.setItem('user', JSON.stringify(data.user))
		}
		// console.log(data);
	}

	onMount(checkuser)
  </script>
  
  <main>
	<Header/>
	<Login />
  </main>
  
  <style>
  </style>