<script lang="ts">
    let username: string;
    let password: string;
    let lmode: string;
    let loginbutt: HTMLButtonElement;
    let msg : string = "";
    import { writable } from "svelte/store";
    const state = writable("dumb");
    const mode = writable("pfft");
    mode.subscribe((e)=>{
        lmode = e;
    })
    async function login(){
        loginbutt.innerText = "logging in ..."
        let a = await fetch(`/login?user=${username}&pass=${password}&job=${lmode}`);
        let x:string = await a.json();
        if (x[0] == "nope"){
            msg = x[1];
            loginbutt.innerText = "login >";
        }
        else{
            state.set(x[1]);
        } 
    }
    
</script>

<div class="hero min-h-[89svh] bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <h3 class="py-6 text-xl">Your match is wating for you next door😘</h3>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username/Email</span>
            </label>
            <input type="email" placeholder="username/email" bind:value={username} class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" bind:value={password} class="input input-bordered" required />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button bind:this={loginbutt} on:click={login} class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>