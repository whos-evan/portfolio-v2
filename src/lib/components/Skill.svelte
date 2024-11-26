<script lang="ts">
	import Icon from '@iconify/svelte';
	import { loadIcons } from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let skillText: string = '';
	export let skillPercentage: number = 0;
	export let skillIcon: string = '';
	export let skillColor: string = '#000000';

	loadIcons([skillIcon], (loaded, missing, pending, unsubscribe) => {
		if (loaded.length) {
			console.log(`Icon ${skillIcon} have been loaded and is ready to be renderered.`);
			return;
		}

		if (missing.length) {
			console.log(`Icon ${skillIcon} does not exist.`);
			return;
		}

		if (pending.length) {
            console.log(`Icon ${skillIcon} is still loading.`);
            return;
		}
	});

	function readableColor(color: string) {
		let r = parseInt(color.substr(1, 2), 16);
		let g = parseInt(color.substr(3, 2), 16);
		let b = parseInt(color.substr(5, 2), 16);

		let brightness = (r * 299 + g * 587 + b * 114) / 1000;

		return brightness > 125 ? '#000000' : '#ffffff';
	}

	let skillPercentageString = skillPercentage.toString() + '%';
	let skillBarWidth = 0;

	onMount(() => {
		setTimeout(() => {
			skillBarWidth = skillPercentage;
		}, 100);
	});
</script>

<div class="flex flex-col items-left">
	<div class="flex flex-row items-center text-xl mb-1 gap-1">
		<Icon icon={skillIcon} height="auto"/>
		<p class="text-xl">{skillText}</p>
	</div>
	<div class="w-full">
		<div class="bg-base-300 h-6 rounded-lg">
			<div
				class="h-6 rounded-lg flex items-center transition-all duration-1000"
				style="width: {skillBarWidth}%; background-color: {skillColor}"
			>
				<p class="text-md ml-2" style="color: {readableColor(skillColor)}">
					{skillPercentageString}
				</p>
			</div>
		</div>
	</div>
</div>
