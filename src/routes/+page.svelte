<script lang="ts">
	import '../app.css';
	import ProfileCard from '$lib/components/ProfileCard.svelte';

	export let data;
</script>

<header class="flex fixed w-full">
	<div class="brand ml-2">
		<img src="favicon.webp" alt="logo" />
		<h1 class="text-3xl ml-2">WOT</h1>
	</div>
	<nav>
		<a class="p-2 hover:underline" href="#league-info">League</a>
		<a class="p-2 hover:underline" href="#league-info">Das Team</a>
		<a class="p-2 hover:underline" href="#league-info">Prime-League</a>
	</nav>
</header>

<div id="introduction" class="flex items-center justify-center border-b-2">
	<div id="title" class="text-center text-3xl">
		<p>Die Welt braucht mehr okaye Leute.</p>
		<br />
		<p>In Sachen E-Sports haben wir die Initiative ergriffen.</p>
		<br />
		<p>Wir stellen vor, das</p>
		<br />
		<p class="underline">WORLDS OKAYEST TEAM</p>
	</div>
</div>

<div id="league-info" class="mt-6 flex flex-col">
	<p class="text-3xl mb-6 text-center">Das Main Roaster</p>
	<div class="card-wrapper mb-6">
		{#each data.response as player, i}

			<ProfileCard playerInfo={player} />
			{#if i === 4}
				<p class="text-3xl my-6 text-center w-full">Unsere Substitutes</p>
			{/if}
		{/each}
	</div>
</div>

<div id="prime-league" class="mt-6">
	<p class="text-3xl text-center">Prime-League</p>
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

	#introduction {
		height: 100vh;
	}

	#league-info {
		width: 100%;
	}
</style>
