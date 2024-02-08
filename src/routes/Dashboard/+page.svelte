<script lang="ts">
	export let data;
	export let selectedItem: string;
	let curruser: string | undefined = '';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { user,choices } from "$lib/stores.js";
	import { get } from 'svelte/store';
	$: inputVal = '';
	// console.log(data)
	async function checkuser() {
		let tmpuser = get(user)
		console.log(tmpuser);
		if (tmpuser) {
			// console.log(data);
			curruser = tmpuser.email.split("@")[0];
		} else {
			window.location.href = '/';
		}
	}
	// console.log(data);
	async function onItemClicked(item: string,n:number) {
      const msgUint8 = new TextEncoder().encode(curruser);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      let tempdata = await supabase
        .from('names')
        .select('chosen_by')
        .eq('roll_no', item?.toUpperCase());
      let tchoice = [];
      if (tempdata.data) {
        tchoice = tempdata.data[0].chosen_by ? tempdata.data[0].chosen_by : [];
      }
      tchoice.push(hashHex);
      const { error } = await supabase
        .from('names')
        .update({ chosen_by: tchoice })
        .eq('roll_no', item?.toUpperCase());
	  tchoice = get(choices);
	  tchoice[n] = item;
	  choices.set(tchoice);
		// console.log(error)
	}
	// $: filteredItems = data.name.filter(function(item) {
	//   return item.Name.toLowerCase().includes(inputVal.toLowerCase())
	// })
	let fitems = data.name;
	function getfiltername(input: string) {
		fitems = [];
		for (let i = 0; i < data.name.length; i++) {
			let inputl = input.split(' ');
			let inc = true;
			for (let j = 0; j < inputl.length; j++) {
				if (!data.name[i].name.toLowerCase().includes(inputl[j].toLowerCase())) {
					inc = false;
				}
			}
			if (inc) {
				console.log(data.name[i]);
				fitems.push(data.name[i]);
			}
		}
		return fitems;
	}
	$: filteredItems = getfiltername(inputVal);
	onMount(checkuser);
</script>

<div class="flex justify-center items-center translate-y-40 flex-col">
	<div class="flex justify-center items-center h-60 w-svw rounded-3xl">
		<div class="dropdown">
			<input
				class="input input-bordered border-4 w-[45vw]"
				placeholder="Pick your Love💖"
				bind:value={inputVal}
			/>
			<ul
				class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[45vw] max-h-52 flex-nowrap overflow-auto"
			>
				{#each filteredItems as item}
					<li>
						<button
							type="button"
							on:click|preventDefault={() => onItemClicked(item.roll_no)}
							role="option"
							aria-selected={selectedItem === item.roll_no}>{item.name}</button
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<button class="bg-base-200 h-12 w-[20vw] rounded-btn"> Submit Your Choices </button>
</div>
