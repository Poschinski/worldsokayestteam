<script lang="ts">
    import { riotIdStore } from "$lib/stores.js";
	import { onMount } from "svelte";

    export let riotId: string;
    export let role: string;

    let res: Promise<any> | null = null

    riotIdStore.set(riotId);

    async function sendData() {
		res = await fetch("/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				riotId
			})
		}).then(async (res) => {
			const ress = await res.json();
			console.log(ress);
			return ress;
	});
	}

    onMount(() => {
        sendData();
    });
    
    
</script>

<div class="card">
    <h3>{riotId}</h3>
    <p>{role}</p>
    <div class="solo-q">
        <div class="left-side">

        </div>
        <div class="right-side">

        </div>
    </div>
    <div class="flex-q">
        <div class="left-side">

        </div>
        <div class="right-side">

        </div>
    </div>
</div>