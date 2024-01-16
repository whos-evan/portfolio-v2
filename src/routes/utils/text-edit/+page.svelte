<script>
	let text = '';
	let result = '';
</script>

<svelte:head>
	<title>evan - text edit</title>
	<meta name="description" content="evan's text edit thing" />
</svelte:head>

<div class="p-4">
	<h1 class="text-5xl font-black text-center mt-2 mb-6">Text Edit</h1>

	<div class="h-[64vh] flex flex-col gap-4">
		<div class="inline-block h-1/2">
			<h2 class="text-2xl font-bold pb-2">Input</h2>
			<textarea
				placeholder="Text goes here"
				class="textarea textarea-bordered textarea-lg w-full h-[80%] max-w-full"
				bind:value={text}
			></textarea>
		</div>

		<div class="inline-block h-1/2">
			<h2 class="text-2xl font-bold pb-2">Result</h2>
			<textarea
				placeholder="Text goes here"
				class="textarea textarea-bordered textarea-lg w-full h-[80%] max-w-full"
				bind:value={result}
			></textarea>
		</div>
	</div>

	<div class="mt-4 flex flex-wrap gap-2">
		<div class="flex flex-wrap gap-2">
			<button class="btn btn-primary" on:click={() => navigator.clipboard.writeText(text)}>
				Copy Input
			</button>
			<button class="btn btn-primary" on:click={() => navigator.clipboard.writeText(result)}>
				Copy Result
			</button>
		</div>
		<div class="flex flex-wrap gap-2">
			<button class="btn btn-accent" on:click={() => (result = text.toLowerCase())}>
				Lowercase
			</button>
			<button class="btn btn-accent" on:click={() => (result = text.toUpperCase())}>
				Uppercase
			</button>
			<button
				class="btn btn-accent"
				on:click={() =>
					(result = text.replace(/(?:^|\s)\S/g, function (a) {
						return a.toUpperCase();
					}))}
			>
				Title Case
			</button>
			<button
				class="btn btn-accent"
				on:click={() =>
					(result = text.replace(/(?:^|\s)\S/g, function (a) {
						return a.toLowerCase();
					}))}
			>
				Sentence Case
			</button>
			<button
				class="btn btn-accent"
				on:click={() =>
					(result = text.replace(/(?:^|\s)\S/g, function (a) {
						return a.toUpperCase();
					}))}
			>
				Capitalize
			</button>
		</div>
		<div class="flex flex-wrap gap-2">
			<!-- Convert every space to a new line -->
			<button class="btn btn-secondary" on:click={() => (result = text.replace(/ /g, '\n'))}>
				Space to New Line
			</button>
			<!-- Convert every new line to a space -->
			<button class="btn btn-secondary" on:click={() => (result = text.replace(/\n/g, ' '))}>
				New Line to Space
			</button>
		</div>
		<div class="flex flex-wrap gap-2">
			<!-- replace text -->
			<input
				type="text"
				placeholder="Replace"
				class="input input-bordered input-info"
				id="replace"
			/>
			<input type="text" placeholder="With" class="input input-bordered input-info" id="with" />
			<button
				class="btn btn-info"
				on:click={() =>
					(result = text.replace(
						new RegExp(document.getElementById('replace').value, 'g'),
						document.getElementById('with').value
					))}
			>
				Replace
			</button>
		</div>
	</div>
</div>
