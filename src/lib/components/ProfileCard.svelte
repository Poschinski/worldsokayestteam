<script lang="ts">
	import type { LeagueEntryDto, LeaguePlayerInfo } from '$lib';
	import LeagueData from './LeagueData.svelte';

	export let playerInfo: LeaguePlayerInfo;

	let soloQData: LeagueEntryDto | undefined
	let flexQData: LeagueEntryDto | undefined

	let urlEncodedName = encodeURIComponent(playerInfo.name.replace('#', '-'));

	let data: LeagueEntryDto[] | LeagueEntryDto | null = null;

	function defineQueueType(apiData: LeagueEntryDto[]) {
		if (!apiData) return;

		data = apiData;

		soloQData = data.find(o => o.queueType === 'RANKED_SOLO_5x5')
		flexQData = data.find(o => o.queueType === 'RANKED_FLEX_SR')
	}

	if (playerInfo.leagueEntries) {
		defineQueueType(playerInfo.leagueEntries);
	}

</script>

<div class="card">
<a href="https://www.leagueofgraphs.com/summoner/euw/{urlEncodedName}" target="_blank" rel="noopener noreferrer">	
	{#if !data}
	<div>Error loading data...</div>
	{:else}
	<div class="card-header border-b-2 mb-1">
		<h2>{playerInfo.name}</h2>
		<p>{playerInfo.lane}</p>
	</div>
	<div class="card-body">
		<LeagueData league={soloQData} type="Solo Queue" />
		<LeagueData league={flexQData} type="Flex Queue" />
	</div>
	{/if}
</a>
</div>

<style>
	.card {
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
		border-radius: 12px;
		overflow: hidden;
		background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
		width: 340px;
		margin: 0 auto;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		border: 1px solid rgba(99, 102, 241, 0.1);
	}
	.card:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 32px rgba(99, 102, 241, 0.2);
	}
	.card h2 {
		color: #1f2937;
		font-size: 24px;
		text-align: center;
		font-weight: 600;
	}
	.card p {
		color: #6b7280;
		font-size: 18px;
		text-align: center;
	}
	
</style>
