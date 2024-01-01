<script>
	import '../app.css';

	import { themeChange } from 'theme-change';
	import Icon from '@iconify/svelte';

	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';
	onMount(() => {
		themeChange(false);
	});
</script>

<div class="bg-base-300 bg-opacity-50 p-4 m-2 rounded-lg">
	<button
		class="absolute mt-1 text-2xl right-6 flex items-center justify-end"
		data-toggle-theme="dark,light"
		data-act-class="ACTIVECLASS"
		on:click={() => theme.update((t) => (t === 'dark' ? 'light' : 'dark'))}
	>
		{#if $theme === 'dark'}
			<Icon icon="ph:moon" />
		{:else}
			<Icon icon="ph:sun" />
		{/if}
	</button>

	<div
		class="flex flex-row justify-evenly sm:w-[40vw] max-w-[34rem] w-full mx-auto h-8 items-center"
	>
		<a href="/blog" class="hover:underline hover:text-xl transition-all"> blog </a>
		<a href="/" class="hover:underline hover:text-xl transition-all text-center"> home </a>
		<a href="/projects" class="hover:underline hover:text-xl transition-all"> projects </a>
	</div>
</div>

<div class="m-2">
	<slot />
</div>
