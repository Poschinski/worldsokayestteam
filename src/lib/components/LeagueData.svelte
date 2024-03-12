<script lang="ts">
    import type { LeagueEntryDto } from '$lib';

    export let league: LeagueEntryDto | null;
    export let type: string;
</script>

<div class="wrapper">
    {#if league}
        <div class="left-side">
            <img src="/img/{league.tier.toLowerCase()}.png" alt="league rank" />
            <h3>{type}</h3>
        </div>
        <div class="right-side">
            <p>
                {league.tier}
                {league.rank} - {league.leaguePoints} LP
            </p>
            <p>
                Winrate: {Math.round(
                    (league.wins / (league.wins + league.losses)) * 1000
                ) / 10}%
            </p>
            <div class="wins-loses">
                <p>Wins: {league.wins} -&nbsp</p>
                <p>Losses: {league.losses}</p>
            </div>
        </div>
    {:else}
        <div class="left-side">
            <img src="/img/unranked.png" alt="league rank" />
            <h3>{type}</h3>
        </div>
        <div class="right-side">
            <p>Unranked</p>
        </div>
    {/if}
</div>

<style>
    .wrapper {
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