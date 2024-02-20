<script lang="ts">
	import Typewriter from '$lib/components/Typewriter.svelte';
	import { formatDate } from '$lib/utils';
	import { onMount } from 'svelte';

	export let data;

	let accepted = data.meta.sensitive ? false : true;
	onMount(async () => {
		if (data.meta.sensitive) {
			const dialog = document.getElementById('sentitive');
			dialog.showModal();
		}
	});
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />

	<!-- author -->
	<meta name="author" content="evan" />
</svelte:head>

{#if !accepted}
	<dialog id="sentitive" class="modal">
		<div class="modal-box">
			<h1 class="text-4xl font-black mb-1">Sensitive Content</h1>
			<p class="mb-4">This post contains sensitive content. Are you sure you want to continue?</p>
			<div class="flex w-full gap-2">
				<button class="btn btn-success flex-1" on:click={() => (accepted = true)}>Yes</button>
				<button class="btn btn-error flex-1" on:click={() => (location.href = '/')}>No</button>
			</div>
		</div>
	</dialog>
{/if}

<article class="prose lg:prose-xl p-8" style={accepted ? '' : 'filter: blur(10px);'}>
	<!-- Title -->
	<hgroup class="not-prose">
		<h1 class="sm:text-6xl text-4xl font-black mb-1">
			<Typewriter speed={50} goofiness={25} content={data.meta.title} carat={false} />
		</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<!-- divider -->
	<hr class="my-2" />

	<!-- Post -->
	<div>
		<svelte:component this={data.content} />
	</div>
</article>
