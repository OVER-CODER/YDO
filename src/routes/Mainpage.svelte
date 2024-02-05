<script>
    export let items = ["Happy","sad","crazy"];
    export let selectedItem;
    $: inputVal = '';
    function onItemClicked(item) {
      document.activeElement.blur()
      selectedItem = item
      inputVal = '';
    }
    $: filteredItems = items.filter(function(item) {
      return item.toLowerCase().includes(inputVal.toLowerCase())
    })
  </script>
  <div class="dropdown">
    <input 
      class="input input-bordered" 
      placeholder="Pick a country"
      bind:value={inputVal}
    />
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 flex-nowrap overflow-auto">
    {#each filteredItems as item}
      <li>
        <a on:click|preventDefault={() => onItemClicked(item)}>{item}</a>
      </li>
    {/each}
    </ul>
  </div>
<div class="flex justify-center items-center translate-y-80 translate-x-96 h-60 w-60 rounded-3xl bg-slate-400 ">
  <div class="dropdown ">
    <input 
      class="input input-bordered" 
      placeholder="Pick a country"
      bind:value={inputVal}
    />
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-80 flex-nowrap overflow-auto">
    {#each filteredItems as item}
      <li>
        <a on:click|preventDefault={() => onItemClicked(item)}>{item}</a>
      </li>
    {/each}
    </ul>
  </div>
</div>