export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	published: boolean;
	sensitive: boolean;
};

export type Playlist = {
	title: string;
	description: string;
	songs: PlaylistSong[];
};

export type PlaylistSong = {
	title: string;
	artist: string;
	album: string;
	albumImageUrl: string;
	songUrl: string;
	previewUrl: string;
};


export type Song = {
	title: string;
	artist: string;
	album: string;
	albumImageUrl: string;
	songUrl: string;
	isPlaying: boolean;
	previewUrl: string;
};

export type Game = {
	name: string;
	appid: number;
	playtime: number;
	img_icon_url: string;
	img_logo_url: string;
	playtime_2weeks: number;
};
