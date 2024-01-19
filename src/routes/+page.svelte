<script lang="ts">

	import ProfileCard from "$lib/components/ProfileCard.svelte";
	let riotId = "";
	let res: Promise<any> | null = sendData();

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
	
	function handleClick() {
		res = sendData();
	}

</script>

<input
	placeholder="Uzu#197"
	bind:value={riotId}
	on:input={() => {
		console.log(riotId);
	}}
/>

<button on:click={handleClick}>Fetch Data</button>

{#await res}
	<p>loading...</p>
{:then response}
	<ProfileCard riotId="Uzu#197" role="ADC" />
	<ProfileCard riotId="Poschinski#1337" role="MID" />
{:catch error}
	<p>{error.message}</p>
{/await}
