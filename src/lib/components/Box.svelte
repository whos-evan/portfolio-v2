<script lang="ts">
	import Icon from '@iconify/svelte';

	export let headingText: string | undefined = undefined;
	export let content: string | undefined = undefined;
	export let imageURL: string | undefined = undefined;
	export let hrefURL: string | undefined = undefined;
</script>

<a href={hrefURL} class="h-full flex-grow">
	<!-- icon to show that it is a link -->
	{#if hrefURL}
		<div class="relative">
			<Icon icon="mdi:arrow-top-right" class="w-6 h-6 absolute top-4 right-4" />
		</div>
	{/if}

	<div
		class="sm:w-[20rem] w-[18rem] bg-base-200 rounded-lg pt-5 pb-6 px-6 h-full flex flex-col justify-center"
	>
		{#if headingText}
			<div class="flex items-center gap-1">
				<h1 class="text-2xl font-semibold w-5/6 break-before-auto">
					{headingText}
				</h1>
			</div>
		{/if}

		<div class="my-1">
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
