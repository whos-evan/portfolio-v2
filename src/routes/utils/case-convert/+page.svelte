<script>
	let text = '';
    let result = '';
</script>

<div class="p-4">
	<h1 class="text-4xl font-black text-center mt-6 mb-6">Case Converter</h1>

	<h2 class="text-2xl font-bold mb-2">Input</h2>
	<textarea
		placeholder="Text goes here"
		class="textarea textarea-bordered textarea-lg w-full h-[30vh] max-w-full"
		bind:value={text}
	></textarea>

	<h2 class="text-2xl font-bold mb-2 mt-4">Result</h2>
	<textarea
		placeholder="Text goes here"
		class="textarea textarea-bordered textarea-lg w-full h-[30vh] max-w-full"
		bind:value={result}
	></textarea>

	<div class="mt-4 flex flex-wrap gap-2">
		<button class="btn btn-primary" on:click={() => navigator.clipboard.writeText(text)}>
            Copy Input
        </button>
        <button class="btn btn-primary" on:click={() => navigator.clipboard.writeText(result)}>
            Copy Result
        </button>
        <button class="btn btn-accent" on:click={() => result = text.toLowerCase()}>
            Lowercase
        </button>
        <button class="btn btn-accent" on:click={() => result = text.toUpperCase()}>
            Uppercase
        </button>
        <button class="btn btn-accent" on:click={() => result = text.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })}>
            Title Case
        </button>
        <button class="btn btn-accent" on:click={() => result = text.replace(/(?:^|\s)\S/g, function(a) { return a.toLowerCase(); })}>
            Sentence Case
        </button>
        <button class="btn btn-accent" on:click={() => result = text.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })}>
            Capitalize
        </button>
	</div>
</div>
