<script lang="ts">
	import { fade } from 'svelte/transition';
	import Typewriter from '$lib/components/Typewriter.svelte';
	import Box from '$lib/components/Box.svelte';
	import { onMount } from 'svelte';

	let ready = false;
	onMount(() => {
		ready = true;
	});

	import Icon from '@iconify/svelte';

	let text: string;
	let content: string = "hello i'm evan!";

	let randomPhoneNum = Math.floor(Math.random() * 10000000000);
	// make sure it's 10 digits
	while (randomPhoneNum.toString().length != 10) {
		randomPhoneNum = Math.floor(Math.random() * 10000000000);
	}

	function convertToHumanReadable(num: number) {
		// minutes to hours and minutes
		let hours = Math.floor(num / 60);
		let minutes = num % 60;

		return `${hours} hours and ${minutes} minutes`;
	}

	// format
	let randomPhone = randomPhoneNum.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

	// in 10 seconds change content to something else
	setTimeout(() => {
		setTimeout(() => {
			content = 'use the terminal with control + shift + h';
		}, 25000);

		setTimeout(() => {
			content = 'or not';
		}, 50000);

		setTimeout(() => {
			content = 'hi again :)';
		}, 60000);
	}, 5000);

	export let data;
</script>

<div class="text-4xl font-bold text-center mt-6">
	<Typewriter goofyness={25} bind:text bind:content />
</div>

{#if ready}
	<!-- random stuff about me -->
	<div
		class="mt-6 flex flex-col gap-4 justify-center items-center"
		transition:fade={{ duration: 250 }}
	>
		<Box
			headingText="about me"
			content="i'm a developer from the united states. i try to make cool stuff."
		/>

		<Box
			headingText="see my projects"
			content="check out some of the cool stuff i've worked on"
			hrefURL="/projects"
		/>

		<Box headingText="contact me">
			<div class="flex flex-col gap-2">
				<a href="https://discord.com">
					<div class="rounded-lg bg-purple-600 text-purple-50">
						<div class="flex flex-row justify-center items-center gap-2 py-2">
							<Icon icon="akar-icons:discord-fill" class="text-2xl" />
							<p class="sm:text-xl text-lg">evan1984</p>
						</div>
					</div>
				</a>

				<a href="mailto:contact@3van.dev">
					<div class="rounded-lg bg-orange-600 text-orange-50">
						<div class="flex flex-row justify-center items-center gap-2 py-2">
							<Icon icon="ic:baseline-mail" class="text-2xl" />
							<p class="sm:text-xl text-lg">contact@3van.dev</p>
						</div>
					</div>
				</a>

				<a href="tel:{randomPhone}">
					<div class="rounded-lg bg-green-600 text-green-50">
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

		<Box headingText="philosophy">
			<table class="table table-xs">
				<tr>
					<td>
						<Icon icon="mdi:internet" class="text-2xl w-6 h-6" />
					</td>
					<td>
						<p class="sm:text-lg text-md">the internet is free.</p>
					</td>
				</tr>

				<tr>
					<td>
						<Icon icon="material-symbols:person" class="text-2xl w-6 h-6" />
					</td>
					<td>
						<p class="sm:text-lg text-md">the internet is for everyone.</p>
					</td>
				</tr>

				<tr>
					<td>
						<Icon icon="mdi:information" class="text-2xl w-6 h-6" />
					</td>
					<td>
						<p class="sm:text-lg text-md">information should be free.</p>
					</td>
				</tr>

				<tr>
					<td>
						<Icon icon="mdi:accessible" class="text-2xl w-6 h-6" />
					</td>
					<td>
						<p class="sm:text-lg text-md">information should be accessible.</p>
					</td>
				</tr>

				<tr>
					<td>
						<Icon icon="mdi:git" class="text-2xl w-6 h-6" />
					</td>
					<td>
						<p class="sm:text-lg text-md">
							<a class="hover:underline" href="https://github.com/whos-evan/portfolio-v2"
								>open source</a
							> is the way to go.
						</p>
					</td>
				</tr>
			</table>
		</Box>

		<Box>
			<!-- spotify now playing box -->
			<h2 class="text-2xl font-semibold">now playing</h2>
			<p class="text-sm text-base-content pb-2">what i'm listening to on spotify.</p>

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
						<p class="sm:text-xl text-lg font-semibold text-ellipsis truncate sm:w-48 w-36">
							{data.song.title}
						</p>
						<p class="sm:text-md text-md text-ellipsis truncate sm:w-48 w-36">{data.song.artist}</p>
					</div>
				</a>
			{/if}
		</Box>

		<Box>
			<!-- spotify now playing box -->
			<h2 class="text-2xl font-semibold">games played</h2>
			<p class="text-sm text-base-content pb-2">
				what i've played in the last 2 weeks along with total playtime.
			</p>

			{#if data.games.totalCount == 0}
				<p class="text-lg">nothing :(</p>
			{:else}
				{#each data.games.games as game}
					<a
						class="flex flex-row gap-2 mt-2"
						href="https://store.steampowered.com/app/{game.appid}"
					>
						<div class="flex flex-col my-auto">
							<div class="flex flex-row gap-2 items-center">
								<img
									src="https://media.steampowered.com/steamcommunity/public/images/apps/{game.appid}/{game.img_icon_url}.jpg"
									alt={game.name + ' game poster.'}
									class="rounded-sm w-6 h-6"
								/>

								<p class="sm:text-xl text-lg font-semibold text-ellipsis truncate sm:w-48 w-36">
									{game.name}
								</p>
							</div>
							<p class="sm:text-md text-md text-ellipsis truncate sm:w-64 w-52">
								{convertToHumanReadable(game.playtime)}
							</p>
						</div>
					</a>
				{/each}
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
