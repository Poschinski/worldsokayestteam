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
            const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
            window.scrollTo({
                top: (anchor?.offsetTop ?? 0) - headerHeight,
                behavior: 'smooth',
            })
			mobileMenuOpen = false;
    }
</script>

<header>
	<a class="brand" href="#introduction" on:click={handleSectionNavigationScroll}>
		<img src="favicon.webp" alt="logo" />
		<span class="brand-name">WOT</span>
	</a>

	<nav class="desktop-nav">
		<a class="nav-link" href="#team" on:click={handleSectionNavigationScroll}>
			<span class="text-xl">Das Team</span>
		</a>
		<a class="nav-link" href="#league-info" on:click={handleSectionNavigationScroll}>
			<span class="text-xl">League</span>
		</a>
		<a class="nav-link" href="#stadtradeln" on:click={handleSectionNavigationScroll}>
			<span class="text-xl">Stadtradeln</span>
		</a>
		<a class="nav-link" href="#prime-league" on:click={handleSectionNavigationScroll}>
			<span class="text-xl">Prime-League</span>
		</a>
	</nav>

	<!-- Burger Menu Button -->
	<button
		on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
		class="burger-btn"
		aria-label="Toggle menu"
	>
		<svg
			class="burger-icon"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			{#if mobileMenuOpen}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			{:else}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			{/if}
		</svg>
	</button>

	<div>

	</div>
</header>

<!-- Mobile Menu -->
{#if mobileMenuOpen}
	<div class="mobile-menu">
		<nav class="mobile-nav">
			<a
				class="mobile-link"
				href="#league-info"
				on:click={handleSectionNavigationScroll}
			>
				Das Team
			</a>
			<a
				class="mobile-link"
				href="#league-info"
				on:click={handleSectionNavigationScroll}
			>
				League
			</a>
			<a
				class="mobile-link"
				href="#stadtradeln"
				on:click={handleSectionNavigationScroll}
			>
				Stadtradeln
			</a>
			<a
				class="mobile-link"
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
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		height: 5rem;
		position: fixed;
		width: 100%;
		z-index: 50;
		background: rgba(15, 20, 30, 0.72);
		backdrop-filter: blur(18px) saturate(160%);
		-webkit-backdrop-filter: blur(18px) saturate(160%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35);
		color: #f3f4f6;
	}

	/* ── Brand ─────────────────────────────────────────── */
	.brand {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: inherit;
	}

	.brand img {
		height: 2.4rem;
		width: 2.4rem;
		object-fit: contain;
		border-radius: 50%;
		transition: transform 0.3s ease;
	}

	.brand:hover img {
		transform: rotate(-5deg) scale(1.08);
	}

	.brand-name {
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		background: linear-gradient(135deg, #e2e8f0 0%, #93c5fd 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		transition: opacity 0.2s ease;
	}

	/* ── Desktop Nav ────────────────────────────────────── */
	.desktop-nav {
		display: none;
		align-items: center;
		gap: 0.25rem;
	}

	@media (min-width: 768px) {
		.desktop-nav {
			display: flex;
		}
	}

	@media (max-width: 767px) {
		.desktop-nav {
			display: none;
		}
	}

	.nav-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1.1rem;
		border-radius: 9999px;
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		color: #cbd5e1;
		text-decoration: none;
		transition: color 0.25s ease, background 0.25s ease;
		overflow: hidden;
	}

	/* Frosted-glass pill on hover */
	.nav-link::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		background: rgba(99, 179, 237, 0.12);
		border: 1px solid rgba(99, 179, 237, 0.2);
		opacity: 0;
		transition: opacity 0.25s ease;
	}

	/* Sliding underline accent */
	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 6px;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 60%;
		height: 2px;
		border-radius: 9999px;
		background: linear-gradient(90deg, #60a5fa, #a78bfa);
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.nav-link:hover {
		color: #e2e8f0;
	}

	.nav-link:hover::before {
		opacity: 1;
	}

	.nav-link:hover::after {
		transform: translateX(-50%) scaleX(1);
	}

	/* ── Burger Button ──────────────────────────────────── */
	.burger-btn {
		display: none;
	}

	@media (max-width: 767px) {
		.burger-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.5rem;
			border-radius: 0.5rem;
			background: rgba(255, 255, 255, 0.06);
			border: 1px solid rgba(255, 255, 255, 0.1);
			color: #e2e8f0;
			cursor: pointer;
			transition: background 0.2s ease, border-color 0.2s ease;
		}

		.burger-btn:hover {
			background: rgba(99, 179, 237, 0.15);
			border-color: rgba(99, 179, 237, 0.35);
		}
	}

	.burger-icon {
		width: 1.5rem;
		height: 1.5rem;
		transition: transform 0.3s ease;
	}

	/* ── Mobile Menu ────────────────────────────────────── */
	.mobile-menu {
		position: fixed;
		top: 5rem;
		left: 0;
		right: 0;
		z-index: 40;
		background: rgba(15, 20, 30, 0.92);
		backdrop-filter: blur(18px) saturate(140%);
		-webkit-backdrop-filter: blur(18px) saturate(140%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
	}

	.mobile-link {
		padding: 1rem 1.5rem;
		color: #cbd5e1;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		text-decoration: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		transition: background 0.2s ease, color 0.2s ease, padding-left 0.2s ease;
	}

	.mobile-link:hover {
		background: rgba(99, 179, 237, 0.1);
		color: #93c5fd;
		padding-left: 2rem;
	}
</style>

