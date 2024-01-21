<script lang="ts">

	import ProfileCard from "$lib/components/ProfileCard.svelte";
	let riotId = "";
	let res: Promise<any> | null = null

</script>

<!-- <input
	bind:value={riotId}
	on:input={() => {
		console.log(riotId);
	}}
/> -->

{#await res}
	<p>loading...</p>
{:then response}
	<ProfileCard riotId="Uzu#197" role="ADC" />
	<ProfileCard riotId="Poschinski#1337" role="MID" />
{:catch error}
	<p>{error.message}</p>
{/await}
