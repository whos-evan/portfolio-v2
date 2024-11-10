import type { PlaylistSong } from '$lib/types';
import { json } from '@sveltejs/kit';
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
const playlist_id = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID;

const basic = btoa(`${client_id}:${client_secret}`);
const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${playlist_id}`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const swearFilter = [
    '*nigg*',
    '*titties*',
    '*jew*',
    '*genitals*',
    '*willy*',
    '*gay*',
    '*jizz*',
    '*dick*',
    '*porn*',
    '*penis*',
    '*masterbation*',
    '*sex*',
    '*tiddies*',
    '*titty*',
    '*farted*'
];


const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=refresh_token&refresh_token=' + refresh_token
    });
    return response.json();
};

export async function GET() {
    const { access_token } = await getAccessToken();
    const response = await fetch(PLAYLIST_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    if (response.status === 204 || response.status > 400) {
        return json({ songs: [] });
    }

    const data = await response.json();
    if (!data.tracks || data.tracks.items.length === 0) {
        return json({ songs: [] });
    }

    let songs: PlaylistSong[] = [];
    for (const track of data.tracks.items) {
        // clean up the data and convert it to an array of PlaylistSong
        // regex filter to remove explicit songs
        let title = track.title;
        let allowedSong = true;
        // regex to check for swear words ("*" is wildcard for any number of characters)
        swearFilter.forEach((swear) => {
            // if the title contains a swear word, return a 204
            // replace the * with .*
            const regex = new RegExp(swear.replace(/\*/g, '.*'), 'gi');
            if (regex.test(title)) {
                allowedSong = false;
            }
        });

        if(allowedSong) {
            let song: PlaylistSong = {
                title: track.track.name,
                artist: track.track.artists[0].name,
                album: track.track.album.name,
                albumImageUrl: track.track.album.images[0].url,
                songUrl: track.track.external_urls.spotify,
                previewUrl: track.track.preview_url
            };

            songs.push(song);
        }


    }


    return json({ title: data.name, description: data.description, songs });
}
