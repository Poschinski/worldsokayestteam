import { lolNames } from '../data/lolNames';
import type { LeagueEntryDto, LeaguePlayerInfo } from '../lib/index';

export async function load({ fetch }) {

	let res = await fetch('/api/league');
	let response = await res.json();
	let data: LeaguePlayerInfo[] = response.data

	return { response: data };
}
