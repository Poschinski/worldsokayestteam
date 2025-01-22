<script lang="ts">
	import '../app.css';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import { ArrowDown } from 'svelte-radix';
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let data;

	let hoverOnArrowDown = false;

	function handleSectionNavigationScroll (event: any) {
		event.preventDefault()
		const link = event.currentTarget
		const anchorId = new URL(link?.href).hash.replace('#', '')
		const anchor = document.getElementById(anchorId)
		window.scrollTo({
			top: anchor?.offsetTop,
			behavior: 'smooth',
		})
	}
</script>

<div class="flex flex-col h-screen border-b-2" id="frontPage">
	<div class="placeholder grow-[2]">

	</div>
	<div id="introduction" class="flex items-center justify-center grow-[14]">
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

<div id="league-info" class="mt-6 flex flex-col w-full">
	<p class="text-3xl mb-6 text-center">Das Main Roaster</p>
	<div class="card-wrapper mb-6 flex flex-wrap justify-around">
		{#each data.response as player, i}
			<ProfileCard playerInfo={player} />
			{#if i === 4}
				<p class="text-3xl my-6 text-center w-full">Unsere Substitutes</p>
			{/if}
			{#if i === 9}
				<br>
			{/if}
		{/each}
	</div>
</div>

<div id="prime-league" class="mt-6">
	<p class="text-3xl text-center">Prime-League</p>
	<div class="p-6 rounded-lg shadow-lg">
		<p class="text-lg text-center mb-6">
		  Wir freuen uns, bekannt zu geben, dass wir dieses Jahr im Split 24/25 in 
		  <span class="text-orange-600 font-semibold">Division 6</span> der Prime League antreten werden.
		</p>
		<p class="text-center">
		  Als <a href="https://www.primeleague.gg/de/leagues/prm/3181-spring-split-202425/teams/164964-worldsokayestteam" class="font-semibold text-blue-400 underline">Worlds Okayest Team</a> stehen wir für Teamgeist, Spaß und den 
		  unermüdlichen Willen, OK zu bleiben.
		</p>
		<p class="text-center mt-6 italic text-gray-600">
		  Folgt unserer Instagram Seite, um unsere Fortschritte, Highlights und Memes zu verfolgen - denn wir nehmen das Spiel nicht ernst
		  und uns selbst nicht zu sehr. 
		</p>
		<div class="text-center mt-8">
		  <a href="https://www.instagram.com/worldsokayestteam/" target="_blank" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-bold cursor-pointer shadow-md">
			Zur WOT Instagram Seite
		  </a>
		</div>
	  </div>
	  
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

</style>
