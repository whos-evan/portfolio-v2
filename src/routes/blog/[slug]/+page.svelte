<script lang="ts">
	import Typewriter from '$lib/components/Typewriter.svelte';
	import { formatDate } from '$lib/utils'

	export let data
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose lg:prose-xl p-8">
  <!-- Title -->
	<hgroup class="not-prose">
		<h1 class="sm:text-6xl text-4xl font-black mb-1">
			<Typewriter speed={50} goofyness={25} content={data.meta.title} carat={false} />
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