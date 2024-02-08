<script lang="ts">
    import Header from "./Header.svelte";
    import Petels from "./Petels.svelte";
    import { writable } from "svelte/store";
    import { supabase } from "$lib/supabase";
    

    async function SigninWithGoogle() {
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }
    </script>
    <div class="w-screen h-[100svh] bg-[#fadede] overflow-clip relative">
        <div class="absolute top-[520px] left-[750px] scale-[2.5] overflow-clip z-30">
        <svg width="348" height="320" viewBox="0 0 348 342" fill="none" xmlns="http://www.w3.org/2000/svg" class="z-20">
            <g clip-path="url(#clip0_1_2)">
            <path d="M168 -10C278 166 284 238 271 436" stroke="#77A377" stroke-width="7" stroke-linecap="square"/>
            </g>
            <defs>
            <clipPath id="clip0_1_2">
            <rect width="348" height="342" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        </div>
        <div class="leaf absolute top-[520px] left-[1030px] z-0" style="rotate: -20deg;"></div>
        <div class="leaf absolute top-[580px] left-[1060px] z-0" style="rotate: 70deg;"></div>
        <!-- <div class="petal absolute top-[220px] left-[450px]" style="rotate: -30deg;"></div>
        <div class="petal absolute top-[220px] left-[450px]" style="rotate: -20deg;"></div> -->
        <!-- <div class="petal absolute top-[120px] left-[580px]" style="rotate: -80deg;"></div> -->
        <Petels />
        <div class=" h-[92svh] w-screen bg-base-200 flex flex-col gap-6">
            <div class=" text-6xl  font-Stint w-1/3 translate-y-28 translate-x-28 select-none">Looking for a match?</div>
            <div class=" h-[74svh] flex justify-center items-center">     
                <div class=" w-1/3 rounded-3xl h-14 flex-col flex justify-center items-center ">
                    <div  class="flex justify-center items-center ">
                        <button on:click={SigninWithGoogle} class="btn btn-outline btn-md btn-primary ext-base ">Login to find you match!</button>
                    </div>
                </div>
                </div>
        </div>
    </div>
    



<!-- src/routes/+page.svelte -->


