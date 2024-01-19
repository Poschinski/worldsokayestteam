<script lang="ts">
    import type { RiotAccountDto, RiotSummonerDto, LeagueEntryDto } from "$lib/index";
    export let riotId: string;
    export let role: string;

    
</script>

<div class="card">
    <h3>{riotId}</h3>
    <p>{role}</p>
    <div class="solo-q">
        <div class="left-side">

        </div>
        <div class="right-side">

        </div>
    </div>
    <div class="flex-q">
        <div class="left-side">

        </div>
        <div class="right-side">

        </div>
    </div>
</div>