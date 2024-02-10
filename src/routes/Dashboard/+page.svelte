<script lang="ts">
	export let data;
	export let selectedItem: string;
	let curruser: string | undefined = '';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Rose from '../Rose.svelte';

	let input1:HTMLInputElement;
	let input2:HTMLInputElement;
	let input3:HTMLInputElement;
	let input4:HTMLInputElement;
	let input5:HTMLInputElement;
	let input:Array<HTMLInputElement>;
	$: inputVal = ['', '', '', '', ''];
	let tmpchoices = ['','','','','',''];
	console.log(data)
	async function checkuser() {
		input = [input1,input2,input3,input4,input5];
		console.log(input)
		if (localStorage.choices == undefined) {
			localStorage.setItem('choices', JSON.stringify(['', '', '', '', '']));
		} else{
			let temp = JSON.parse(localStorage.choices);
			for (let i = 0; i < temp.length; i++) {
				if (temp[i] != '') {					
					let name = '';
					for (let j = 0; j < data.name.length; j++) {
						if (data.name[j].roll_no === temp[i]) {
							name = data.name[j].name;
							break;
						}
					}
					input[i].value = name;
					inputVal[i] = name;
					input[i].disabled = true;
				}
				tmpchoices = temp;
			}
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
	async function onItemClicked(item: string, n: number, name: string) {
		console.log(input)
		input[n].value = name;
		inputVal[n] = name;
		input[n].disabled = true;
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
		if(!tchoice.includes(hashHex)){
			tchoice.push(hashHex);
		}
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

	async function DeleteEntry(item: string, n: number, name: string) {
		if(input[n].disabled == false){
			return;
		}
		input[n].value = "";
		inputVal[n] = "";
		input[n].disabled = false;
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
				// if(data.name[i].name.includes("ARYAN PANDIT")){
				// 	console.log(data.name[i]);
				// }
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

<main class="h-[100svh] w-screen relative overflow-clip">
	<Rose />
	<div class="flex justify-center items-center pt-[12%] max-md:pt-[20%] flex-col gap-4">
		<div class="flex justify-center font-serif text-xl text-center max-md:text-base mx-2">
			<h1 class="z-50">
				Submit your choices now and comback on Valentines day, to see who you are matched with...
			</h1>
		</div>
		<div
			class="z-50 h-1/3 w-[60%] max-md:w-[95vw] max-md:mx-2 flex flex-col justify-center rounded-box items-center shadow-md bg-accent/35"
		>
			<div class="flex justify-center items-center gap-1 h-20 w-[95vw] rounded-3xl">
				<div class="dropdown flex gap-5">
					<input
						class="input shadow-lg border-4 w-[40vw] max-md:w-[70vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[0]}
						bind:this={input1}
					/>
					<button class="btn" on:click={() => DeleteEntry(tmpchoices[0],0,inputVal[0])}> Delete </button>
					<ul
						class="dropdown-content mt-12 z-[1] menu p-2 shadow-lg bg-base-100 rounded-b-box w-[40vw] max-md:w-[70vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems1 as item}
							<li>
								<button
									type="button"
									on:click={() => onItemClicked(item.roll_no, 0, item.name)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name} <span class="font-mono text-sm opacity-45">{item.roll_no}</span></button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex justify-center items-center h-20 w-[95vw] rounded-3xl">
				<div class="dropdown flex gap-5">
					<input
						class="input shadow-lg border-4 w-[40vw] max-md:w-[70vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[1]}
						bind:this={input2}
					/>
					<button class="btn" on:click={() => DeleteEntry(tmpchoices[1],1,inputVal[1])}> Delete </button>
					<ul
						class="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-b-box w-[40vw] max-md:w-[70vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems2 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 1, item.name)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name} <span class="font-mono text-sm opacity-45">{item.roll_no}</span></button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex justify-center items-center h-20 w-[95vw] rounded-3xl">
				<div class="dropdown flex gap-5">
					<input
						class="input shadow-lg border-4 w-[40vw] max-md:w-[70vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[2]}
						bind:this={input3}
					/>
					<button class="btn" on:click={() => DeleteEntry(tmpchoices[2],2,inputVal[2])}> Delete </button>
					<ul
						class="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-[40vw] max-md:w-[70vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems3 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 2, item.name)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name} <span class="font-mono text-sm opacity-45">{item.roll_no}</span></button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex justify-center items-center h-20 w-[95vw] rounded-3xl">
				<div class="dropdown flex gap-5">
					<input
						class="input shadow-lg border-4 w-[40vw] max-md:w-[70vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[3]}
						bind:this={input4}
					/>
					<button class="btn" on:click={() => DeleteEntry(tmpchoices[3],3,inputVal[3])}> Delete </button>
					<ul
						class="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-[40vw] max-md:w-[70vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems4 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 3, item.name)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name} <span class="font-mono text-sm opacity-45">{item.roll_no}</span></button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="flex justify-center items-center h-20 w-[95vw] rounded-3xl">
				<div class="dropdown flex gap-5">
					<input
						class="input shadow-lg border-4 w-[40vw] max-md:w-[70vw]"
						placeholder="Pick your choice"
						bind:value={inputVal[4]}
						bind:this={input5}
					/>
					<button class="btn" on:click={() => DeleteEntry(tmpchoices[4],4,inputVal[4])}> Delete </button>
					<ul
						class="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-[40vw] max-md:w-[70vw] max-h-52 flex-nowrap overflow-auto"
					>
						{#each filteredItems5 as item}
							<li>
								<button
									type="button"
									on:click|preventDefault={() => onItemClicked(item.roll_no, 4, item.name)}
									role="option"
									aria-selected={selectedItem === item.roll_no}>{item.name} <span class="font-mono text-sm opacity-45">{item.roll_no}</span></button
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</main>

