<script lang="ts">
    import type { RiotAccountDto, RiotSummonerDto, LeagueEntryDto } from "$lib/index";
    export let riotId: string;
    export let role: string;

    const name = riotId.split("#")[0];
    const tag = riotId.split("#")[1];

    async function getPUUID() {
        const res = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`, {
            headers: {
                "X-Riot-Token": import.meta.env.VITE_RIOT_API_KEY
            }
        });
        const data: RiotAccountDto = await res.json();

        return data.puuid;
    }

    async function getSummonerId(puuid:string) {
        const res = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
            headers: {
                "X-Riot-Token": import.meta.env.VITE_RIOT_API_KEY
            }
        });
        const data: RiotSummonerDto = await res.json();

        return data.id;
    }

    async function getLeagueEntries(summonerId:string) {
        const res = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
            headers: {
                "X-Riot-Token": import.meta.env.VITE_RIOT_API_KEY
            }
        });
        const data: LeagueEntryDto[] = await res.json();

        return data;
    }

    async function getSummonerData() {
        const puuid = await getPUUID();
        const summonerId = await getSummonerId(puuid);
        const leagueEntries = await getLeagueEntries(summonerId);

        console.log(leagueEntries);
    }

    getSummonerData();
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