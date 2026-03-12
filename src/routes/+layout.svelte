<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	let mobileMenuOpen = false;

    function handleSectionNavigationScroll (event: any) {
            event.preventDefault()
            const link = event.currentTarget
            const anchorId = new URL(link?.href).hash.replace('#', '')
            const anchor = document.getElementById(anchorId)
            window.scrollTo({
                top: anchor?.offsetTop,
                behavior: 'smooth',
            })
			mobileMenuOpen = false;
    }
</script>

<header class="flex fixed w-full z-50">
	<div class="brand ml-2">
		<img src="favicon.webp" alt="logo" />
		<h1 class="text-4xl font-bold ml-2">WOT</h1>
	</div>
	<nav class="hidden md:flex">
		<a class="p-3 hover:underline text-2xl" href="#league-info" on:click={handleSectionNavigationScroll}>League</a>
		<a class="p-3 hover:underline text-2xl" href="#league-info" on:click={handleSectionNavigationScroll}>Das Team</a>
		<a class="p-3 hover:underline text-2xl" href="#prime-league" on:click={handleSectionNavigationScroll}>Prime-League</a>
	</nav>
	
	<!-- Burger Menu Button -->
	<button
		on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
		class="md:hidden flex items-center justify-center p-3 ml-auto"
	>
		<svg
			class="w-6 h-6 text-gray-100"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>
</header>

<!-- Mobile Menu -->
{#if mobileMenuOpen}
	<div class="fixed top-20 left-0 right-0 bg-gray-800 md:hidden z-40">
		<nav class="flex flex-col">
			<a
				class="p-4 text-gray-100 hover:bg-gray-700 hover:text-blue-400 transition"
				href="#league-info"
				on:click={handleSectionNavigationScroll}
			>
				League
			</a>
			<a
				class="p-4 text-gray-100 hover:bg-gray-700 hover:text-blue-400 transition"
				href="#league-info"
				on:click={handleSectionNavigationScroll}
			>
				Das Team
			</a>
			<a
				class="p-4 text-gray-100 hover:bg-gray-700 hover:text-blue-400 transition"
				href="#prime-league"
				on:click={handleSectionNavigationScroll}
			>
				Prime-League
			</a>
		</nav>
	</div>
{/if}

<main>
	<slot></slot>
</main>

<style lang="postcss">
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        height: 5rem;
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        color: theme(colors.gray.100);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .brand {
        display: flex;
        align-items: center;
    }
    :global(nav a) {
        transition: all 0.3s ease;
    }
    :global(nav a:hover) {
        color: theme(colors.blue.400);
        text-decoration-color: theme(colors.blue.400);
    }
</style>


