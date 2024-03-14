// place files you want to import through the `$lib` alias in this folder.
export { default as ProfileCard } from './components/ProfileCard.svelte';

export type RiotAccountDto = {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export type RiotSummonerDto = {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

export type LeagueEntryDto = {
    leagueId: string;
    summonerId: string;
    summonerName: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
}

export type ApiResponse = {
    status?: number;
    message?: string;
    data?: LeagueEntryDto[];
}

export type LeaguePlayerInfo = {
    name: string;
    lane: string;
    leagueEntries: LeagueEntryDto[];
}