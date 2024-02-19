export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	published: boolean;
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
