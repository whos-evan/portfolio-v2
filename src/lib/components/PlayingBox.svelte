<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onNavigate } from '$app/navigation';

	export let audioUrl: string = '';

	let audio = new Audio(audioUrl);
	audio.volume = 0.1;
	audio.loop = false;

	$: onNavigate(() => {
		audio.pause();
	});

	let thisAudio: HTMLDivElement;

	let playing = false;
</script>

{#if audioUrl}
	<!-- Small icon in the bottom right corner that allows the user to control the preview of the song. -->
	<div class="fixed bottom-0 right-0 z-50 p-2" bind:this={thisAudio}>
		<button
			class="bg-base-300 rounded-full w-12 h-12"
			id="icon"
			on:click={() => {
				if (audio.paused) {
					audio.play();

					playing = true;
				} else {
					audio.pause();

					playing = false;
				}
			}}
		>
			{#if playing}
				<Icon icon="mdi:pause" class="w-6 h-6 m-auto" />
			{:else}
				<Icon icon="mdi:play" class="w-6 h-6 m-auto" />
			{/if}
		</button>
	</div>
{/if}
