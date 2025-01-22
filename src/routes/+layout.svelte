<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

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

<header class="flex fixed w-full">
	<div class="brand ml-2">
		<img src="favicon.webp" alt="logo" />
		<h1 class="text-3xl ml-2">WOT</h1>
	</div>
	<nav>
		<a class="p-3 hover:underline" href="#league-info" on:click={handleSectionNavigationScroll}>League</a>
		<a class="p-3 hover:underline" href="#league-info" on:click={handleSectionNavigationScroll}>Das Team</a>
		<a class="p-3 hover:underline" href="#prime-league" on:click={handleSectionNavigationScroll}>Prime-League</a>
	</nav>
</header>

<slot></slot>
<style lang="postcss">
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
</style>


