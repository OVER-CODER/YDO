<script lang="ts">
	// import { onMount } from "svelte";
    // import { supabase } from "$lib/supabase";

    // async function onload() {
    //     const userdata =  JSON.parse(localStorage.user);
    //     const cur_roll = userdata.email.split("@")[0];
    //     const { data } = await supabase
    //         .from("names")
    //         .select("chosen_by")
    //         .eq("roll_no", cur_roll?.toUpperCase());

    //     const chosenBy = data;
    //     console.log(chosenBy[0].chosen_by)
    //     return chosenBy[0].chosen_by;
    // }
    // onMount(onload)
</script>


<div>
    <slot />
</div>
