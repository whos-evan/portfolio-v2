<script lang="ts">
	import { fade } from 'svelte/transition';
	import Box from '$lib/components/Box.svelte';

	export let data;
</script>

<svelte:head>
	<title>evan - blog</title>
	<meta name="description" content="evan's blog" />
</svelte:head>

<h1 class="text-4xl font-bold text-center pt-6">blog</h1>

<div
	class="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 w-fit mx-auto gap-4 justify-center items-center"
	in:fade={{ duration: 250 }}
	out:fade={{ duration: 0 }}
>
	{#each data.posts as post}
		<Box hrefURL="/blog/{post.slug}" headingText={post.title} content={post.description} />
	{/each}
</div>
