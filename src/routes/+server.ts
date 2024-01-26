import { json } from "@sveltejs/kit";
import type { RiotAccountDto, RiotSummonerDto, LeagueEntryDto } from "../lib/index";

export const POST = async ({ request }) => {
    const res = await request.json()
    const leagueEntries: LeagueEntryDto[] = await getSummonerData(res.riotId);
    return json({
        status: 200,
        message: 'OK',
        data: leagueEntries
    })
}

async function getPUUID(riotId: string) {
    let name = riotId.split("#")[0];
    let tag = riotId.split("#")[1];
    name = encodeURIComponent(name);
    tag = encodeURIComponent(tag);
    const res = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`, {
        headers: {
            "X-Riot-Token": import.meta.env.VITE_RIOT_API_KEY
        }
    });
    const data: RiotAccountDto = await res.json();

    return data.puuid;
}

async function getSummonerId(puuid: string) {
    const res = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
        headers: {
            "X-Riot-Token": import.meta.env.VITE_RIOT_API_KEY
        }
    });
    const data: RiotSummonerDto = await res.json();

    return data.id;
}

async function getLeagueEntries(summonerId: string) {
    const res = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
        headers: {
            "X-Riot-Token": import.meta.env.VITE_RIOT_API_KEY
        }
    });
    let data: LeagueEntryDto[] = await res.json();
    
    // Sort by queue type
    data = data.sort((a, b) => { 
        if (a.queueType > b.queueType) return 1;
        if (a.queueType < b.queueType) return -1;
        return 0;
    });

    return data;
}

async function getSummonerData(riotId: string) {
    
    const puuid = await getPUUID(riotId);
    const summonerId = await getSummonerId(puuid);
    const leagueEntries = await getLeagueEntries(summonerId);

    return leagueEntries;
}


