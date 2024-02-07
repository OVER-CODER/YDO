<script lang="ts">
	import Header from "./Header.svelte";
	let currstate:string;
	import { writable } from "svelte/store";
	import Login from "./Login.svelte"
	import Mainpage from "./Mainpage.svelte"
    const state = writable("dumb");
 
	
	state.subscribe((e)=>{
	  currstate = e;
	  console.log(currstate)
	})
  </script>
  
  <main>
	<Header/>
	{#if currstate=="loggedin"}
		<Mainpage />
	{:else}
	  	<Login />
	{/if}
  </main>
  
  <style>
  </style>