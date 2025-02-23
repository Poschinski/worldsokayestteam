import { json } from "@sveltejs/kit";
import { lolNames } from "../../../data/lolNames";
import type { RiotAccountDto, RiotSummonerDto, LeagueEntryDto, LeaguePlayerInfo } from "../../../lib/index";

let cache: { timestamp: number; data: LeaguePlayerInfo[] } | null = null;

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET(event) {
    const now = Date.now();

    if (cache && now - cache.timestamp < 60000) {
        console.log("Returning cached data");
        return json({
            status: 200,
            message: 'OK',
            data: cache.data
        });
    }

    console.log("Fetching new data...");
    const response: LeaguePlayerInfo[] = [];

    for (let i = 0; i < lolNames.length; i++) {
        const data = lolNames[i];
        const leagueEntries = await getSummonerData(data.name);
        response.push({
            name: data.name,
            lane: data.lane,
            leagueEntries: leagueEntries
        });

        if (i % 20 === 19) { // Nach 20 Requests 1 Sekunde warten
            await delay(1000);
        }
    }

    cache = {
        timestamp: now,
        data: response
    };

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
    let [name, tag] = riotId.split("#");
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


