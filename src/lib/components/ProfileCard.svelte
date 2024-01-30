<script lang="ts">
	import type { ApiResponse } from '$lib';
	import { onMount } from 'svelte';

	export let riotId: string;
	export let role: string;

	let promise: Promise<ApiResponse>;

	onMount(() => {
		promise = fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				riotId
			})
		}).then((res) => {
			return res.json();
		});
	});
</script>

{#await promise}
	<p>loading...</p>
{:then response}
	<div class="card">
		<div class="card-header border-b-2 mb-1">
			<h3>{riotId}</h3>
			<p>{role}</p>
		</div>
		{#if response && response.data && response.data.length > 0}
		<div class="card-body">
			<div class="solo-q">
				{#if response.data[1] == null || response.data[1] == undefined}
					<div class="left-side">
						<img src="/img/unranked.webp" alt="league rank" />
						<h3>Solo-Q</h3>
					</div>
					<div class="right-side">
						<p>Unranked</p>
					</div>
				{:else}
					<div class="left-side">
						<img src="/img/{response.data[1].tier.toLowerCase()}.png" alt="league rank" />
						<h3>Solo-Q</h3>
					</div>
					<div class="right-side">
						<p>
							{response.data[1].tier}
							{response.data[1].rank} - {response.data[1].leaguePoints} LP
						</p>
						<p>
							Winrate: {Math.round(
								(response.data[1].wins / (response.data[1].wins + response.data[1].losses)) * 1000
							) / 10}%
						</p>
						<div class="wins-loses">
							<p>Wins: {response.data[1].wins} -&nbsp</p>
							<p>Losses: {response.data[1].losses}</p>
						</div>
					</div>
				{/if}
			</div>
			<div class="flex-q">
				{#if response.data[0] == null || response.data[0] == undefined}
					<div class="left-side">
						<img src="/img/unranked.webp" alt="league rank" />
						<h3>Flex-Q</h3>
					</div>
					<div class="right-side">
						<p>Unranked</p>
					</div>
				{:else}
					<div class="left-side">
						<img src="/img/{response.data[0].tier.toLowerCase()}.png" alt="league rank" />
						<h3>Flex-Q</h3>
					</div>
					<div class="right-side">
						<p>{response.data[0].tier} {response.data[0].rank} - {response.data[1].leaguePoints} LP</p>
						<p>
							Winrate: {Math.round(
								(response.data[0].wins / (response.data[0].wins + response.data[0].losses)) * 1000
							) / 10}%
						</p>
						<div class="wins-loses">
							<p>Wins: {response.data[0].wins} -&nbsp</p>
							<p>Losses: {response.data[0].losses}</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
		{:else}
			<p>Could not load any Data.</p>
		{/if}
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}

<style>
	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		overflow: hidden;
		background-color: #fff;
		max-width: 600px;
		margin: 0 auto;
	}
	.card h3 {
		color: #333;
		font-size: 24px;
		text-align: center;
	}
	.card p {
		color: #666;
		font-size: 18px;
		text-align: center;
	}
	.solo-q, .flex-q {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		border-radius: 10px;
	}
	.wins-loses {
		display: flex;
	}
	.left-side {
		flex-basis: 40%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.right-side {
		flex-basis: 60%;
		text-align: right;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
