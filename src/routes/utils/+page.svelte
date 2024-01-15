<script lang="ts">
	import { fade } from 'svelte/transition';
	import Box from '$lib/components/Box.svelte';

	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>evan - utils</title>
	<meta name="description" content="evan's utils" />
</svelte:head>

<h1 class="text-4xl font-bold text-center pt-6">utils</h1>

<div
	class="mt-6 flex flex-col gap-4 justify-center items-center"
	in:fade={{ duration: 250 }}
	out:fade={{ duration: 0 }}
>
	<Box
		headingText="info"
		content="some nice utilities i've made."
	/>
	<Box headingText="final grade calculator" content="calculate your final grade in a class." hrefURL="/utils/final-grade" />
	<Box headingText="text editor" content="some nice utils for editing text." hrefURL="/utils/text-edit" />
	<Box headingText="pomodoro timer" content="exactly what you think it is." hrefURL="/utils/pomodoro-timer" />
	<!-- Coming soon to those who read this for some reason. -->
	<!-- <Box headingText="freeDNS generator" content="generate a freeDNS domain for your server." hrefURL="/utils/freedns-gen" /> -->
</div>
