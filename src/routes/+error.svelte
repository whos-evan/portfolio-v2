<script>
	import { page } from '$app/stores';
</script>

<div class="p-8">
	<h1 class="text-7xl font-black">oh no!</h1>

	<p class="text-2xl mt-6 lowercase">
		{#if $page.error}
			error: {$page.error.message} :(
		{:else}
			unknown error
		{/if}
	</p>
</div>
