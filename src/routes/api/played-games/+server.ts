import { json } from "@sveltejs/kit";
import type { Game } from "$lib/types";
const STEAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;

export async function GET() {
    const response = await fetch(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=76561198331375987&format=json&count=3`);
    if (response.status === 204 || response.status > 400) {
        return json({ totalCount: 0, games: [] });
    }

    const data = await response.json();

    // clean up the data
    let games: Game[] = [];
    let totalCount = 0;

    totalCount += data.response.total_count;
    games = data.response.games.map((game: Game) => {
        return {
            name: game.name,
            appid: game.appid,
            playtime: game.playtime_2weeks,
            img_icon_url: game.img_icon_url,
            img_logo_url: game.img_logo_url
        }
    })

    return json({ totalCount, games });
}