<script lang="ts">

	import ProfileCard from "$lib/components/ProfileCard.svelte";
	let res: Promise<any> | null = null

</script>

<div class="card-wrapper">

	<ProfileCard riotId="WOT Spiiekiie#EUW" role="Top" />
	<ProfileCard riotId="WOT Forest#EUW" role="Jungle" />
	<ProfileCard riotId="WOT Schorsch#EUW" role="Mid" />
	<ProfileCard riotId="WOT val played#EUW" role="ADC" />
	<ProfileCard riotId="WOT Aradius#EUW" role="Support" />

</div>

<style>

	.card-wrapper {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
</style>