<script lang="ts">
	import '../app.css';

	import { themeChange } from 'theme-change';
	import Icon from '@iconify/svelte';

	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';
	import Dog from '$lib/components/Dog.svelte';
	import Terminal from '$lib/components/Terminal.svelte';

	onMount(() => {
		themeChange(false);
	});

	let innerWidth: number;
</script>

<div class="bg-base-300 bg-opacity-50 p-4 m-2 rounded-lg">
	<button
		class="absolute mt-1 text-2xl right-6 flex items-center justify-end hover:scale-125 transition-transform"
		data-toggle-theme="dark,light"
		data-act-class="ACTIVECLASS"
		aria-label="toggle theme"
		on:click={() => theme.update((t) => (t === 'dark' ? 'light' : 'dark'))}
	>
		{#if $theme === 'dark'}
			<Icon icon="ph:moon" />
		{:else}
			<Icon icon="ph:sun" />
		{/if}
	</button>

	<nav
		class="flex flex-row justify-evenly sm:w-[40vw] max-w-[34rem] w-full mx-auto h-8 items-center"
	>
		<a
			href="/blog"
			class="hover:underline hover:text-xl transition-all"
			tabindex="0"
			aria-label="Go to blog">blog</a
		>
		<a
			href="/"
			class="hover:underline hover:text-xl transition-all text-center"
			tabindex="0"
			aria-label="Go to home">home</a
		>
		<a
			href="/projects"
			class="hover:underline hover:text-xl transition-all"
			tabindex="0"
			aria-label="Go to projects">projects</a
		>
	</nav>
</div>

<div class="m-2 min-h-[calc(100vh-90px)]">
	<slot />
</div>

<svelte:window bind:innerWidth />

<!-- on window resize kill dog and re-render -->
{#key innerWidth}
	<Dog />
{/key}

<Terminal />
