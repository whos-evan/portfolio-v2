import type { Post, Song, Playlist } from '$lib/types';

export async function load({ fetch }) {
	const response = await fetch('api/posts');
	const posts: Post[] = await response.json();

	const spotify = await fetch('/api/now-playing');
	const song: Song = await spotify.json();

	const spotifyPlaylist = await fetch('/api/playlist');
	const playlist: Playlist = await spotifyPlaylist.json();

	const steam = await fetch('/api/played-games');
	const games = await steam.json();

	return { posts, song, games, playlist };
}
