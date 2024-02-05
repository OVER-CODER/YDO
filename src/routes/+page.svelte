<script lang="ts">
	import Startpage from "./Startpage.svelte";
	import Mainpage from "./Mainpage.svelte";
	import Loginpage from "./Loginpage.svelte";
	import Login from "./Login.svelte";
	let currstate:string;
	import { writable } from "svelte/store";
    const state = writable("dumb");
 
	state.subscribe((e)=>{
	  currstate = e;
	  console.log(currstate)
	})
  </script>
  
  <main>
	{#if currstate=="loggedin"}
	<span>hellu!</span>
	{:else if currstate=="loggingin"}
	  <Loginpage />
	{:else}
	  <Login />
	  <!-- <Mainpage/> -->
	{/if}
  </main>
  
  <style>
  </style>