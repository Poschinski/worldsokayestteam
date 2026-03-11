<script lang="ts">
	import '../app.css';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import { ArrowDown } from 'svelte-radix';
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let data;

	let hoverOnArrowDown = false;
	let startFlyAnimation = false;
	let showRealTitle = false;

	onMount(() => {
		setTimeout(() => {
			startFlyAnimation = true;
		}, 1000);

		setTimeout(() => {
        	showRealTitle = true;
    	}, 2500); // Nach der Fly-Up Animation
	});

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

			{#if !showRealTitle}
				<p class="font-bold">
					{#each 'WORLDS OKAYEST TEAM'.split(' ') as word, wordIndex}
						<span
							class={`inline-block ${startFlyAnimation ? 'animate-fly-up' : ''}`}
							style={`--word-index: ${wordIndex}; opacity: 0; transform: translateY(100px);`}
						>
							{#each word.split('') as char, i}
								<span
									class="inline-block text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text"
									style="--char-index: {i}"
								>
									{char}
								</span>
							{/each}
						</span>
						{#if wordIndex < 'WORLDS OKAYEST TEAM'.split(' ').length - 1}
						<span>{' '}</span>
						{/if}
					{/each}
				</p>
			{:else}
				<!-- else content here -->
				<p class="underline font-bold">
					{#each 'WORLDS OKAYEST TEAM'.split('') as char, i}
						<span
							class="inline-block animate-letter-glow text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text"
							style="--char-index: {i}"
						>
							{char === ' ' ? '\u00A0' : char}
						</span>
					{/each}
				</p>
			{/if}
		</div>
	</div>
	<div class="flex items-center justify-center grow-[3]">
		<a
			href="#league-info"
			class="relative flex items-center justify-center"
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
				width="80"
				height="80"
				viewBox="0 0 80 80"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				class="absolute"
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
			<ArrowDown size={40} />
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
			<br />
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
		wir nehmen uns selbst und unsere Gegner nicht zu ernst.
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

	@keyframes gradient {
		0% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
		100% {
			background-position: 0% center;
		}
	}

	@keyframes letter-glow {
		0%,
		20% {
			filter: drop-shadow(0 0 0px transparent);
		}
		10%,
		15% {
			filter: drop-shadow(0 0 5px rgba(168, 85, 247, 1))
				drop-shadow(0 0 10px rgba(59, 130, 246, 0.8));
		}
		20%,
		100% {
			filter: drop-shadow(0 0 0px transparent);
		}
	}

	@keyframes fly-up {
		0% {
			opacity: 0;
			transform: translateY(100px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.animate-gradient) {
		animation: gradient 4s ease infinite;
	}

	:global(.animate-letter-glow) {
		animation: letter-glow 8s ease-in-out infinite;
		animation-delay: calc(var(--char-index) * 0.08s);
	}

	:global(.animate-fly-up) {
		animation: fly-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
		animation-delay: calc(var(--word-index) * 0.3s);
	}
</style>
