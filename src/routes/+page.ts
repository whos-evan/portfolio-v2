import type { Post, Song, Playlist } from '$lib/types';

export async function load({ fetch }) {
	let response = await fetch('api/posts');
	let spotify = await fetch('/api/now-playing');
	let spotifyPlaylist = await fetch('/api/playlist');
	let steam = await fetch('/api/played-games');

	return {
		posts: response.json(),
		song: spotify.json(),
		playlist: spotifyPlaylist.json(),
		games: steam.json()
	};
}
