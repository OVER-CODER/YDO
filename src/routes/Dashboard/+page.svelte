<script lang="ts">
    export let data;
    console.log(data)
    export let selectedItem: string;
    $: inputVal = '';
    function onItemClicked(item: string) {
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
      selectedItem = item
      inputVal = '';
    }
    // $: filteredItems = data.names.filter(function(item) {
    //   return item.Name.toLowerCase().includes(inputVal.toLowerCase())
    // })
    let fitems = data.names;
    function getfiltername(input:string){
        fitems = []
        for(let i = 0;i<data.names.length;i++){
        let inputl = input.split(' ');
        let inc = true;
        for(let j=0;j<inputl.length;j++){
            if(!(data.names[i].Name.toLowerCase().includes(inputl[j].toLowerCase()))){
                inc = false;
            }
        }
        if(inc){
            console.log(data.names[i]);
            fitems.push(data.names[i]);
        }
    }
        return fitems;
    }
    $: filteredItems = getfiltername(inputVal);
 
</script>

<div class="flex justify-center items-center translate-y-40 flex-col">
<div class="flex justify-center items-center  h-60 w-svw rounded-3xl ">
  <div class="dropdown">
    <input 
      class="input input-bordered border-4 w-[45vw]" 
      placeholder="Pick your Love💖"
      bind:value={inputVal}
    />
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[45vw] max-h-52 flex-nowrap overflow-auto">
    {#each filteredItems as item}
      <li>
        <button type="button" on:click|preventDefault={() => onItemClicked(item)} role="option" aria-selected={selectedItem === item}>{item.Name}</button>
      </li>
    {/each}
    </ul>
  </div>
</div>
<button class="bg-base-200 h-12 w-[20vw] rounded-btn">
  Submit Your Choices
</button>
</div>

