<script lang="ts">
	export let text = '';
    let mistakes = 0;
	let characters = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
		' ',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	];
    export let content: string = '';
	export let speed: number = 150;
	export let goofyness: number = 25;
	export let carat: boolean = true;
	let rage: boolean = false;

	let originalContent: string = content;
	$: if (content != originalContent) {
		text = '';
		originalContent = content;

		// reset interval
		clearInterval(typewriter);

		// create a new interval
		typewriter = setInterval(typewriterFunc, speed);

	}

	let typewriter = setInterval(typewriterFunc, speed)

	function typewriterFunc() {
		let random = Math.floor(Math.random() * 100);
		if (Math.floor(Math.random() * 1000) < 1) {
			// rage by slamming the keyboard
			for (let i = 0; i < 10; i++) {
				text += characters[Math.floor(Math.random() * characters.length)];
			}
			mistakes += 10;
		} else if (random < goofyness) {
			text += characters[Math.floor(Math.random() * characters.length)];
			mistakes++;
		} else {
			if (mistakes > 0) {
				// remove last character
				text = text.substring(0, text.length - 1);
				mistakes--;
			} else {
				text += content.charAt(text.length);
			}
		}

		if (text == content) {
			// kill interval
			clearInterval(typewriter);
		}
	}



	let showCarat = true;
	const zeCarat = setInterval(() => {
		if (text != content || !carat) {
			showCarat = false;
		}
		showCarat = !showCarat;
	}, 500);
</script>

<div class="flex-row">
	{text}
	<!-- move really close to the text -->
	<span class="relative right-2">
		{#if showCarat}
			<span>|</span>
		{:else}
			<span class="opacity-0">|</span>
		{/if}
	</span>
</div>
