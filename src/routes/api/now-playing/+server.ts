import { json } from '@sveltejs/kit';
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
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
	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	});

	if (response.status === 204 || response.status > 400) {
		return json({ isPlaying: false });
	}

	const data = await response.json();

	if (data.currently_playing_type !== 'track') {
		return json({ isPlaying: false });
	}

	// clean up the data
	let isPlaying, title, artist, album, albumImageUrl, songUrl;
	let showSong: boolean = true;
	if (data) {
		isPlaying = data.is_playing;
		if (isPlaying) {
			title = data.item.name;
			// regex to check for swear words ("*" is wildcard for any number of characters)
			swearFilter.forEach((swear) => {
				// if the title contains a swear word, return a 204
				// replace the * with .*
				const regex = new RegExp(swear.replace(/\*/g, '.*'), 'gi');
				if (regex.test(title)) {
					showSong = false;
				}
			});
			artist = data.item.artists.map((_artist) => _artist.name).join(', ');
			album = data.item.album.name;
			albumImageUrl = data.item.album.images[0].url;
			songUrl = data.item.external_urls.spotify;
		}
	} else {
		return new Response('No data', { status: 204 });
	}

	if (!showSong) {
		return json({ isPlaying: false });
	}

	const nowPlaying = {
		isPlaying,
		title,
		artist,
		album,
		albumImageUrl,
		songUrl
	};

	return json(nowPlaying);
}
