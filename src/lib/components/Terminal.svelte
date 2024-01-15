<script lang="ts">
	import { onMount } from 'svelte';

	let content = 'welcome to the terminal!';
	let input = '';

	function terminalInput(input: string) {
		let output = '';
		switch (input) {
			case 'help':
				output += 'help - show this message';
				output += '\nabout - show info about me';
				output += '\ncontact - show contact info';
				output += '\nprojects - show my projects';
				output += '\nutils - show my utils';
                output += '\nclear - clear the terminal';
				output += '\nexit - close the terminal';
				break;
			case 'about':
				output += 'name: evan';
				output += '\nlocation: united states';
				output += '\noccupation: student';
				break;
			case 'contact':
				output += 'email: contact@3van.dev';
				output += '\nphone: {add random phone number here lol}';
				output += '\ndiscord: evan1984';
				break;
			case 'projects':
				// redirect to projects page
                output += 'redirecting to projects page...';
                // sleep for 1 second
                setTimeout(() => {
                    window.location.href = '/projects';
                }, 1000);
				break;
			case 'utils':
				// redirect to utils page
				output += 'redirecting to utils page...';
				// sleep for 1 second
				setTimeout(() => {
					window.location.href = '/utils';
				}, 1000);
				break;
            case 'blog':
                // redirect to blog page
                output += 'redirecting to blog page...';
                // sleep for 1 second
                setTimeout(() => {
                    window.location.href = '/blog';
                }, 1000);
                break;
            case 'clear':
                output = '';
                content = '';
                break;
			case 'exit':
				output += 'bye!';
                // sleep for 1 second
                setTimeout(() => {
                    const terminal = document.getElementById('terminal');
                    terminal.close();
                }, 1000);
                
				break;
			default:
				output += `${input}: command not found`;
				break;
		}

		return output;
	}

	function inputHandler(e) {
		if (e.key === 'Enter') {
			
            if(terminalInput(input) === '') {
                // clear
                content = '';
                input = '\n';
                return;
            }
            if (content === '') {
                content += `$ ${input}`;
            } else {
                content += `\n$ ${input}`;
            }

			content += `\n${terminalInput(input)}`;
			input = '';
		}
	}

	onMount(() => {
		// Open the modal
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.shiftKey && e.key === 'H') {
				e.preventDefault();
				document.getElementById('terminal').showModal();
			}
		});
	});
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="terminal" class="modal">
	<div class="modal-box rounded-none bg-black max-h-[30rem]">
		<!-- cool terminal background -->
		<div class="bg-black text-green-900">
			<div class="font-mono">
				<pre>{content}</pre>
				<div>
                    <span>$</span>
					<input
						type="text"
						area-label="terminal input"
						class="bg-black font-mono focus:outline-none focus:shadow-none focus:bg-opacity-0 rounded-none"
						bind:value={input}
						on:keydown={inputHandler}
					/>
				</div>
			</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
