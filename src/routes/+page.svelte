<script lang="ts">
	import '../app.css';

	import ProfileCard from '$lib/components/ProfileCard.svelte';
</script>

<header>
	<div class="brand">
		<img src="favicon.webp" alt="logo" />
		<h1 class="text-3xl ml-2">WOT</h1>
	</div>
	<nav></nav>
</header>

<div class="card-wrapper">
	<ProfileCard riotId="WOT Spiiekiie#EUW" role="Top" />
	<ProfileCard riotId="WOT Forest#EUW" role="Jungle" />
	<ProfileCard riotId="WOT Schorsch#EUW" role="Mid" />
	<ProfileCard riotId="WOT val played#EUW" role="ADC" />
	<ProfileCard riotId="WOT Aradius#EUW" role="Support" />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		height: 4rem;
		background-color: theme(colors.gray.800);
		color: theme(colors.gray.100);
		margin-bottom: 1rem;
	}
	.brand {
		display: flex;
		align-items: center;
	}

	.card-wrapper {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
</style>
