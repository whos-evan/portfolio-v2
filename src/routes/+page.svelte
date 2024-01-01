<script lang="ts">
	import { fade } from 'svelte/transition';
	import Typewriter from '$lib/components/Typewriter.svelte';
	import Box from '$lib/components/Box.svelte';

	import Icon from '@iconify/svelte';

	let text: string;
	let content: string = 'hello im evan!';

	let randomPhoneNum = Math.floor(Math.random() * 10000000000);
	// make sure it's 10 digits
	while (randomPhoneNum.toString().length != 10) {
		randomPhoneNum = Math.floor(Math.random() * 10000000000);
	}

	// format
	let randomPhone = randomPhoneNum.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

	export let data;
</script>

<div class="text-4xl font-bold text-center mt-6">
	<Typewriter speed={50} goofyness={25} bind:text bind:content />
</div>

{#if text == content}
	<!-- random stuff about me -->
	<div
		class="mt-6 flex flex-col gap-4 justify-center items-center"
		transition:fade={{ duration: 250 }}
	>
		<Box
			headingText="about me"
			content="im a developer from the united states. i try to make cool stuff."
		/>

		<Box
			headingText="see my projects"
			content="check out some of the cool stuff i've worked on"
			hrefURL="/projects"
		/>

		<Box headingText="contact me">
			<div class="flex flex-col gap-2">
				<a href="https://discord.com">
					<div class="rounded-lg bg-purple-500 text-purple-100">
						<div class="flex flex-row justify-center items-center gap-2 py-2">
							<Icon icon="akar-icons:discord-fill" class="text-2xl" />
							<p class="sm:text-xl text-lg">evan1984</p>
						</div>
					</div>
				</a>

				<a href="mailto:contact@3van.dev">
					<div class="rounded-lg bg-orange-500 text-orange-100">
						<div class="flex flex-row justify-center items-center gap-2 py-2">
							<Icon icon="ic:baseline-mail" class="text-2xl" />
							<p class="sm:text-xl text-lg">contact@3van.dev</p>
						</div>
					</div>
				</a>

				<a href="tel:{randomPhone}">
					<div class="rounded-lg bg-green-500 text-green-100">
						<div class="flex flex-row justify-center items-center gap-2 py-2">
							<Icon icon="solar:phone-bold" class="text-2xl" />
							<p class="sm:text-xl text-lg">
								{randomPhone}
							</p>
						</div>
					</div>
				</a>
			</div>
		</Box>

		<Box>
			<!-- spotify now playing box -->
			<h2 class="text-2xl font-semibold">now playing</h2>
			<p class="text-sm text-base-content pb-2">what im listening to on spotify.</p>

			{#if data.song.isPlaying == false}
				<p class="text-lg">nothing is playing right now :(</p>
			{:else}
				<a class="flex flex-row gap-2 mt-2" href={data.song.songUrl}>
					<img
						src={data.song.albumImageUrl}
						alt={data.song.title + ' album art.'}
						class="rounded-lg w-16 h-16"
					/>
					<div class="flex flex-col my-auto">
						<p class="sm:text-xl text-lg font-semibold text-ellipsis truncate sm:w-48 w-36">{data.song.title}</p>
						<p class="sm:text-md text-md text-ellipsis truncate sm:w-48 w-36">{data.song.artist}</p>
					</div>
				</a>
			{/if}
		</Box>

		<Box
			headingText="see some utilities"
			content="just some utilities i've made"
			hrefURL="/utils"
		/>

		{#each data.posts as post}
			<Box hrefURL="/blog/{post.slug}" headingText={post.title} content={post.description} />
		{/each}
	</div>
{/if}
