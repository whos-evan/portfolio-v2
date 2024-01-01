<script lang="ts">
	export let headingText: string | undefined = undefined;
	export let content: string | undefined = undefined;
	export let imageURL: string | undefined = undefined;
	export let hrefURL: string | undefined = undefined;
</script>

<a href={hrefURL}>
	<div class="sm:w-[20rem] w-[16rem] bg-base-200 rounded-lg pt-5 pb-6 px-6">
		{#if headingText}
			<h1 class="text-2xl font-semibold">
				{headingText}
			</h1>
		{/if}

		<div class="mt-2">
			<slot />
		</div>

		{#if content}
			<p>
				{content}
			</p>
		{/if}

		{#if imageURL}
			<img src={imageURL} alt={headingText + "'s content image."} class="rounded-lg mt-4" />
		{/if}
	</div>
</a>
