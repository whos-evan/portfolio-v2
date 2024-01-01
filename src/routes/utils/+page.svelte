<script lang="ts">
	import { fade } from 'svelte/transition';
	import Box from '$lib/components/Box.svelte';

	import Icon from '@iconify/svelte';
</script>

<h1 class="text-4xl font-bold text-center mt-6">utils</h1>

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
	<Box headingText="case converter" content="convert the case of a text." hrefURL="/utils/case-convert" />
</div>
