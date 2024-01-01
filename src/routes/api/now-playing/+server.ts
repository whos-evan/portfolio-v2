import { json } from "@sveltejs/kit";
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`)
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=refresh_token&refresh_token=' + refresh_token,
    })
    return response.json()
}

export async function GET() {
    const { access_token } = await getAccessToken()
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    });

    if (response.status === 204 || response.status > 400) {
        return json({ isPlaying: false });
    }

    const data = await response.json();
    // clean up the data
    let isPlaying, title, artist, album, albumImageUrl, songUrl;
    if (data) {
        isPlaying = data.is_playing;
        if (isPlaying) {
            title = data.item.name;
            artist = data.item.artists.map((_artist) => _artist.name).join(", ");
            album = data.item.album.name;
            albumImageUrl = data.item.album.images[0].url;
            songUrl = data.item.external_urls.spotify;
        }
    } else {
        return new Response("No data", { status: 204 });
    }

    const nowPlaying = {
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
    };

    return json(nowPlaying);
}