import { json } from "@sveltejs/kit";
import { lolNames } from "../../../data/lolNames";
import type { RiotAccountDto, RiotSummonerDto, LeagueEntryDto, LeaguePlayerInfo } from "../../../lib/index";

export async function GET(event) {
    const promises = lolNames.map(async (data) => {
        const leagueEntries = await getSummonerData(data.name);
        return {
            name: data.name,
            lane: data.lane,
            leagueEntries: leagueEntries
        };
    });

    const response: LeaguePlayerInfo[] = await Promise.all(promises);


    event.setHeaders({
        'Cache-Control': 'max-age=60'
    })

    return json({
        status: 200,
        message: 'OK',
        data: response
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

    return data;
}

async function getSummonerData(riotId: string) {
    
    const puuid = await getPUUID(riotId);
    const summonerId = await getSummonerId(puuid);
    const leagueEntries = await getLeagueEntries(summonerId);

    return leagueEntries;
}


