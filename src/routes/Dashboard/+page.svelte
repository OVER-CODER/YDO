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
    $: filteredItems = data.names.filter(function(item) {
      return item.Name.toLowerCase().includes(inputVal.toLowerCase())
    })
</script>


<div class="flex justify-center items-center translate-y-80 translate-x-96 h-60 w-60 rounded-3xl bg-slate-400 ">
  <div class="dropdown ">
    <input 
      class="input input-bordered" 
      placeholder="Pick your Love💖"
      bind:value={inputVal}
    />
    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 flex-nowrap overflow-auto">
    {#each filteredItems as item}
      <li>
        <button type="button" on:click|preventDefault={() => onItemClicked(item)} role="option" aria-selected={selectedItem === item}>{item.Name}</button>
      </li>
    {/each}
    </ul>
  </div>
</div>