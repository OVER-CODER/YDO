<script lang="ts">
	export let data;
	export let selectedItem: string;
	let curruser: string | undefined = '';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	$: inputVal = ['', '', '', '', ''];
	// console.log(data)
	async function checkuser() {
		if (localStorage.choices == undefined) {
			localStorage.setItem('choices', JSON.stringify(['', '', '', '', '']));
		}
		if (localStorage.user) {
			let tmpuser = JSON.parse(localStorage.user);
			console.log(tmpuser);
			if (tmpuser) {
				curruser = tmpuser.email.split('@')[0];
			} else {
				window.location.href = '/';
			}
		} else {
			window.location.href = '/';
		}
	}
	// console.log(data);
	async function onItemClicked(item: string, n: number) {
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
		if (tempdata.data) {
			tchoice = tempdata.data[0].chosen_by ? tempdata.data[0].chosen_by : [];
		}
		tchoice.push(hashHex);
		console.log(tchoice);
		const { error } = await supabase
			.from('names')
			.update({ chosen_by: tchoice })
			.eq('roll_no', item?.toUpperCase());
		console.log(error);
		let nchoice = JSON.parse(localStorage.choices);
		console.log(nchoice);
		nchoice[n] = item;
		localStorage.setItem('choices', JSON.stringify(nchoice));
		//   console.log(localStorage.choices,nchoice);
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
				// console.log(data.name[i]);
				fitems.push(data.name[i]);
			}
		}
		return fitems;
	}
	$: filteredItems1 = getfiltername(inputVal[0]);
	$: filteredItems2 = getfiltername(inputVal[1]);
	$: filteredItems3 = getfiltername(inputVal[2]);
	$: filteredItems4 = getfiltername(inputVal[3]);
	$: filteredItems5 = getfiltername(inputVal[4]);
	onMount(checkuser);
</script>

<main class="h-screen w-screen bg-base-200">
	<div class="flex justify-center items-center translate-y-40 flex-col">
		<div class="flex justify-center h-10 px-7 font-serif text-xl">
			<h1>
				Submit your choices now and comback on Valentines day, to see who you are matched with...
			</h1>
		</div>
		<div
			class="h-1/3 w-1/2 flex flex-col justify-center rounded-box items-center shadow-md bg-accent/35"
		>
			<div class="flex justify-center items-center gap-1 h-20 w-svw rounded-3xl">
				<div class="dropdown">
					<input
						class="input shadow-lg border-4 w-[40vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[0]}
					/>
					<button class="btn"> Delete </button>
					<ul
						class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-b-box w-[45vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems1 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 0)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name}</button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex justify-center items-center h-20 w-svw rounded-3xl">
				<div class="dropdown">
					<input
						class="input shadow-lg border-4 w-[40vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[1]}
					/>
					<button class="btn"> Delete </button>
					<ul
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-b-box w-[45vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems2 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 1)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name}</button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex justify-center items-center h-20 w-svw rounded-3xl">
				<div class="dropdown">
					<input
						class="input shadow-lg border-4 w-[40vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[2]}
					/>
					<button class="btn"> Delete </button>
					<ul
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[45vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems3 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 2)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name}</button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex justify-center items-center h-20 w-svw rounded-3xl">
				<div class="dropdown">
					<input
						class="input shadow-lg border-4 w-[40vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[3]}
					/>
					<button class="btn"> Delete </button>
					<ul
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[45vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems4 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 3)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name}</button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex justify-center items-center h-20 w-svw rounded-3xl">
				<div class="dropdown">
					<input
						class="input shadow-lg border-4 w-[40vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[4]}
					/>
					<button class="btn"> Delete </button>
					<ul
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[45vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems5 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 4)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name}</button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</main>
