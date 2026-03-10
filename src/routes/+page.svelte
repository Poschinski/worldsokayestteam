<script lang="ts">
	import '../app.css';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import { ArrowDown } from 'svelte-radix';
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let data;

	let hoverOnArrowDown = false;

	function handleSectionNavigationScroll(event: any) {
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link?.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor?.offsetTop,
			behavior: 'smooth'
		});
	}
</script>

<div
	class="flex flex-col h-screen border-b-2 bg-gradient-to-br from-gray-50 via-white to-blue-50"
	id="frontPage"
>
	<div class="placeholder grow-[2]"></div>
	<div id="introduction" class="flex items-center justify-center grow-[14] px-4">
		<div id="title" class="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800">
			<p>Die Welt braucht mehr okaye Leute.</p>
			<br class="hidden sm:block" />
			<p>In Sachen E-Sports haben wir die Initiative ergriffen.</p>
			<br class="hidden sm:block" />
			<p>Wir stellen vor, das</p>
			<br class="hidden sm:block" />
			<p class="underline font-bold">WORLDS OKAYEST TEAM</p>
		</div>
	</div>
	<div class="flex items-start justify-center grow-[2]">
		<a
			href="#league-info"
			class="flex items-center justify-center"
			on:mouseenter={() => {
				hoverOnArrowDown = !hoverOnArrowDown;
			}}
			on:mouseleave={() => {
				setTimeout(() => {
					hoverOnArrowDown = !hoverOnArrowDown;
				}, 1000);
			}}
			on:click={handleSectionNavigationScroll}
		>
			<svg
				width="40"
				height="40"
				viewBox="0 0 80 80"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				class="-mr-8"
			>
				{#if hoverOnArrowDown}
					<circle
						class=""
						cx="40"
						cy="40"
						r="32"
						fill="none"
						stroke="black"
						stroke-width="2"
						transition:draw={{ duration: 2000, easing: quintOut }}
					/>
				{/if}
			</svg>
			<ArrowDown />
		</a>
	</div>
</div>

<div id="league-info" class="mt-12 flex flex-col w-full border-b-2 pb-12">
	<p class="text-4xl mb-12 text-center font-bold text-gray-800">Das Main Roaster</p>
	<div class="card-wrapper mb-12 flex flex-wrap justify-around gap-8">
		{#each data.response as player, i}
			<ProfileCard playerInfo={player} />
			{#if i === 4}
				<p class="text-3xl my-12 text-center w-full font-bold text-gray-800">Unsere Substitutes</p>
			{/if}
			{#if i === 9}
				<br />
			{/if}
		{/each}
	</div>
</div>

<div id="prime-league" class="pt-12 pb-4 bg-gradient-to-br from-gray-50 via-white to-blue-5">
	<p class="text-4xl text-center font-bold text-gray-800 mb-8">Prime-League</p>
	<div class="p-8">
		<div class="text-lg text-center mb-6">
			<p>
				Wir freuen uns, bekannt zu geben, dass wir dieses Jahr im Split 25/26 in
				<span class="text-orange-600 font-semibold">Division 6</span> der Prime League antreten werden.
			</p>
			<br/>
			<p>
				Mehr Infos dazu findet ihr auf unserer <a
					href="https://www.primeleague.gg/de/leagues/prm/3218-winter-split-202526/teams/164964-worldsokayestteam"
					target="_blank"
					class="text-blue-500 hover:text-blue-700 underline">Prime League Seite</a
				>
			</p>
		</div>
	</div>
</div>
<footer
	class="p-12 mt-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-4 border-blue-600"
>
	<p class="text-center text-gray-100 text-lg">
		Als <a
			href="https://www.primeleague.gg/de/leagues/prm/3181-spring-split-202425/teams/164964-worldsokayestteam"
			target="_blank"
			class="font-semibold text-blue-300 underline hover:text-blue-200 transition"
			>Worlds Okayest Team</a
		> stehen wir für Teamgeist, Spaß und den unermüdlichen Willen, OK zu bleiben.
	</p>
	<p class="text-center mt-8 italic text-gray-300">
		Folgt unserer Instagram Seite, um unsere Fortschritte, Highlights und Memes zu verfolgen - denn
		wir nehmen und selbst und unsere Gegner nicht zu ernst.
	</p>
	<div class="text-center mt-10">
		<a
			href="https://www.instagram.com/worldsokayestteam/"
			target="_blank"
			class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-bold cursor-pointer shadow-lg transition-all hover:shadow-xl inline-block"
		>
			Zur WOT Instagram Seite
		</a>
	</div>
</footer>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
	}
</style>
