<script lang="ts">
	import type { ApiResponse, LeagueEntryDto, LeaguePlayerInfo } from '$lib';
	import LeagueData from './LeagueData.svelte';

	export let playerInfo: LeaguePlayerInfo;

	let soloQData: LeagueEntryDto | undefined
	let flexQData: LeagueEntryDto | undefined

	let data: LeagueEntryDto[] | LeagueEntryDto | null = null;

	function defineQueueType(apiData: LeagueEntryDto[]) {
		if (!apiData) return;

		data = apiData;

		soloQData = data.find(o => o.queueType === 'RANKED_SOLO_5x5')
		flexQData = data.find(o => o.queueType === 'RANKED_FLEX_SR')
	}

	defineQueueType(playerInfo.leagueEntries);

</script>

<div class="card">
	{#if !data}
		<div>Error loading data...</div>
	{:else}
	<div class="card-header border-b-2 mb-1">
		<h3>{playerInfo.name}</h3>
		<p>{playerInfo.lane}</p>
	</div>
	<div class="card-body">
		<LeagueData league={soloQData} type="Solo Queue" />
		<LeagueData league={flexQData} type="Flex Queue" />
	</div>
	{/if}
</div>

<style>
	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		overflow: hidden;
		background-color: #fff;
		width: 340px;
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
