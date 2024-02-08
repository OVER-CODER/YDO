<script lang="ts">
	import Header from "./Header.svelte";
	import Login from "./Login.svelte"
	import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
	import { user } from "$lib/stores.js"
	import { get } from "svelte/store";

	async function checkuser() {
		if(get(user).exists){
			window.location.href = "/Dashboard";
			return;
		}
		const { data, error } = await supabase.auth.getSession();
		if(data.session){
			window.location.href = "/Dashboard";
		}
		console.log(data);
	}

	onMount(checkuser)
  </script>
  
  <main>
	<Header/>
	<Login />
  </main>
  
  <style>
  </style>