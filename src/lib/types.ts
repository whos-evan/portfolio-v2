export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	published: boolean
}

export type Song = {
    title: string
    artist: string
    album: string
    albumImageUrl: string
    songUrl: string
    isPlaying: boolean
}
