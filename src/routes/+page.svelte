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
	import Skill from '$lib/components/Skill.svelte';
	import PlayingBox from '$lib/components/PlayingBox.svelte';

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

	// change content to something else
	setTimeout(() => {
		setTimeout(() => {
			content = 'hi again :)';
		}, 60000);
	}, 5000);

	onMount(async () => {
		function scrollThruPlaylist() {
			let playlist = document.getElementById('playlist');
			let scrollInterval;

			function startScrolling() {
				scrollInterval = setInterval(() => {
					playlist.scrollTop += 2;

					if (playlist.scrollTop - 3 >= playlist.scrollHeight - playlist.clientHeight) {
						playlist.scrollTop = 0;
					}
				}, 50);
			}

			function stopScrolling() {
				clearInterval(scrollInterval);
			}

			playlist?.addEventListener('mouseenter', stopScrolling);
			playlist?.addEventListener('mouseleave', startScrolling);
			playlist?.addEventListener('touchstart', stopScrolling);

			// if hovering over any part of the playlist on load, stop scrolling
			if (playlist?.matches(':hover')) {
				stopScrolling();
			} else {
				startScrolling();
			}


			
		}

		let interval = setInterval(() => {
			if (document.getElementById('playlist')) {
				scrollThruPlaylist();
				clearInterval(interval);
			}
		}, 500);
	})

	export let data;
</script>

<svelte:head>
	<title>evan</title>
	<meta name="description" content="evan's thing" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#000000" />
</svelte:head>

<div class="text-4xl font-bold text-center mt-6">
	<Typewriter goofiness={25} bind:text bind:content />
</div>

{#if ready}
	<PlayingBox audioUrl={data.song.previewUrl} />

	<!-- random stuff about me -->
	<div
		class="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 w-fit mx-auto gap-4 justify-center items-center"
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

		<Box headingText="skills">
			<div class="flex flex-col gap-2">
				<!-- docker -->
				<Skill
					skillText="docker"
					skillPercentage={95}
					skillIcon="vscode-icons:file-type-docker"
					skillColor="#2496ed"
				/>

				<!-- tailwind -->
				<Skill
					skillText="tailwind css"
					skillPercentage={95}
					skillIcon="vscode-icons:file-type-tailwind"
					skillColor="#38b2ac"
				/>

				<!-- svelte -->
				<Skill
					skillText="svelte"
					skillPercentage={85}
					skillIcon="vscode-icons:file-type-svelte"
					skillColor="#ff3e00"
				/>

				<!-- python -->
				<Skill
					skillText="python"
					skillPercentage={70}
					skillIcon="vscode-icons:file-type-python"
					skillColor="#3776ab"
				/>

				<!-- javascript -->
				<Skill
					skillText="javascript"
					skillPercentage={65}
					skillIcon="vscode-icons:file-type-js-official"
					skillColor="#f7df1e"
				/>

				<!-- typescript -->
				<Skill
					skillText="typescript"
					skillPercentage={55}
					skillIcon="vscode-icons:file-type-typescript-official"
					skillColor="#007acc"
				/>

				<Skill
					skillText="java"
					skillPercentage={50}
					skillIcon="vscode-icons:file-type-java"
					skillColor="#5382a1"
				/>
			</div>
		</Box>

		<Box>
			<!-- spotify now playing box -->
			<h2 class="text-2xl font-semibold">now playing</h2>
			<p class="text-sm text-base-content pb-2">what i'm listening to on spotify.</p>

			{#if data.song.isPlaying == false}
				<p class="text-lg">nothing is playing right now :(</p>
			{:else}
				<a class="flex flex-col gap-2" href={data.song.songUrl}>
					<img
						src={data.song.albumImageUrl}
						alt={data.song.title + ' album art.'}
						class="rounded-lg w-full mt-2"
					/>
					<div class="flex flex-col my-auto">
						<p class="sm:text-xl text-lg font-semibold text-ellipsis truncate w-5/6">
							{data.song.title}
						</p>
						<p class="sm:text-md text-md text-ellipsis truncate sm:w-52 w-36">{data.song.artist}</p>
					</div>
				</a>
			{/if}
		</Box>

		<Box>
			<!-- spotify now playing box -->
			<h2 class="text-2xl font-semibold">{data.playlist.title}</h2>
			<p class="text-sm text-base-content pb-2">{data.playlist.description}</p>

			{#if data.playlist.songs.length == 0}
				<p class="text-lg">nothing :(</p>
			{:else}
			<!-- slowly scroll -->
				<div class="max-h-72 overflow-y-scroll overflow-x-hidden scroll-smooth" id="playlist">
					{#each data.playlist.songs as song}
						<a class="flex flex-row gap-2 max-h-52" href={song.songUrl}>
							<!-- cover art on the left with song title and description to the right -->
							<img
								src={song.albumImageUrl}
								alt={song.title + ' album art.'}
								class="rounded-lg w-12 h-12"
							/>

							<div class="flex flex-col my-auto w-full">
								<p class="sm:text-xl text-lg font-semibold text-ellipsis truncate w-5/6">
									{song.title}
								</p>
								<p class="sm:text-md text-md text-ellipsis truncate w-5/6">{song.artist}</p>
							</div>
						</a>
					{/each}
				</div>
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

		<Box
			headingText="recommendations for software"
			content="just some recommendations for software i use."
			hrefURL="/recommendations"
		/>
	</div>

	<!-- divider -->
	<div class="mt-8 w-12 mx-auto">
		<hr />
	</div>

	<div
		class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 w-fit mx-auto gap-4 justify-center items-center mt-2"
		transition:fade={{ duration: 250 }}
	>
		<h1 class="text-4xl font-bold text-center col-span-full my-4">blog posts</h1>

		{#each data.posts as post}
			<Box hrefURL="/blog/{post.slug}" headingText={post.title} content={post.description} />
		{/each}
	</div>
{/if}
