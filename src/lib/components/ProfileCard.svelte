<script lang="ts">
	import type { ApiResponse, LeagueEntryDto } from '$lib';
	import { onMount } from 'svelte';
	import LeagueData from './LeagueData.svelte';

	export let riotId: string;
	export let role: string;

	let promise: Promise<ApiResponse>;
	let soloQData: LeagueEntryDto | null = null;
	let flexQData: LeagueEntryDto | null = null;

	onMount(() => {
		fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				riotId
			})
		})
			.then((res) => res.json())
			.then((apiData) => {
				defineQueueType(apiData);
			});
	});

	function defineQueueType(apiData: ApiResponse) {
	
		if (!apiData.data) return;

		const data = apiData.data;
		data.forEach((entry: LeagueEntryDto) => {
			if (entry.queueType === 'RANKED_SOLO_5x5') {
				soloQData = entry;
			} else if (entry.queueType === 'RANKED_FLEX_SR') {
				flexQData = entry;
			}
		});
	}

</script>

{#await promise}
	<p>loading...</p>
{:then response}
	<div class="card">
		<div class="card-header border-b-2 mb-1">
			<h3>{riotId}</h3>
			<p>{role}</p>
		</div>
		<div class="card-body">
			<LeagueData league={soloQData} type="Solo Queue" />
			<LeagueData league={flexQData} type="Flex Queue" />
		</div>
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
	
</style>
