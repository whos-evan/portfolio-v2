<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let isRunning = false;

	let totalTime = 1500;
	let timeRemaining = totalTime;
	let timeElapsed = 0;

	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	$: hours = Math.floor(timeRemaining / 3600);
	$: minutes = Math.floor((timeRemaining % 3600) / 60);
	$: seconds = Math.floor(timeRemaining % 60);

	let setHours = 0;
	let setMinutes = 25;
	let setSeconds = 0;
	function setTime() {
		totalTime = setHours * 3600 + setMinutes * 60 + setSeconds;
		hours = setHours;
		minutes = setMinutes;
		seconds = setSeconds;

		timeRemaining = totalTime;

		intervalManager(false);
	}

	let breakTime = 300;
	let setBreakHours = 0;
	let setBreakMinutes = 5;
	let setBreakSeconds = 0;
	function setBreak() {
		breakTime = setBreakHours * 3600 + setBreakMinutes * 60 + setBreakSeconds;
	}

	let interval: any;
	function tick() {
		timeRemaining--;
		timeElapsed++;

		if (timeRemaining <= 0) {
			stopTimer();

			// play sound
			// random number 1 to 1000 (inclusive)
			let random = Math.floor(Math.random() * 1000) + 1;
			if (random == 1) {
				timerSpecial.play();
			} else {
				timer.play();
			}

			// start break
			startBreak();
		}
	}

	function intervalManager(start: boolean) {
		if (start) {
			interval = setInterval(tick, 1000);
		} else {
			clearInterval(interval);
		}
	}

	function startTimer() {
		isRunning = true;

		// start the interval
		intervalManager(true);
	}

	function stopTimer() {
		isRunning = false;

		// stop the interval
		intervalManager(false);
	}

	function restartTimer() {
		timeRemaining = totalTime;

		// stop the interval
		intervalManager(false);
		isRunning = false;
	}

	function startBreak() {
		timeRemaining = breakTime;
		isRunning = false;

		// stop the interval
		intervalManager(false);
	}

	onDestroy(stopTimer);
</script>

<audio src="/audio/timer.wav" id="timer" />
<audio src="/audio/timer-done-special.wav" id="timerSpecial" />

<main>
	<h1 class="sm:text-7xl text-5xl font-black">Pomodoro Timer</h1>
	<div class="mt-10 mb-10">
		<div class="grid grid-flow-col gap-5 text-center auto-cols-max w-fit mx-auto">
			<div class="flex flex-col p-2 bg-base-200 rounded-box text-content">
				<span class="countdown font-mono text-5xl sm:text-8xl">
					<span style="--value:{hours};"></span>
				</span>
				hours
			</div>
			<div class="flex flex-col p-2 bg-base-200 rounded-box text-content">
				<span class="countdown font-mono text-5xl sm:text-8xl">
					<span style="--value:{minutes};"></span>
				</span>
				min
			</div>
			<div class="flex flex-col p-2 bg-base-200 rounded-box text-content">
				<span class="countdown font-mono text-5xl sm:text-8xl">
					<span style="--value:{seconds};"></span>
				</span>
				sec
			</div>
		</div>
	</div>

	<div class="flex flex-row gap-2 justify-center">
		<button on:click={startTimer} class="btn btn-lg btn-success" disabled={isRunning}>Start</button>
		<button on:click={stopTimer} class="btn btn-lg btn-error" disabled={!isRunning}>Stop</button>
		<button on:click={restartTimer} class="btn btn-lg btn-info">Restart</button>
	</div>

	<!-- adjust timer and break duration -->
	<div class="mt-10 mb-10">
		<h2 class="text-3xl font-bold mb-2">Timer/Break Duration</h2>

		<div class="flex flex-row gap-2 justify-center mb-4">
			<label class="form-control w-fit">
				<div class="label">
					<span class="label-text">Hours</span>
				</div>
				<input
					type="number"
					class="input input-bordered w-24"
					placeholder="Time (hrs)"
					bind:value={setHours}
					disabled={isRunning}
					min="0"
					max="24"
				/>
			</label>

			<label class="form-control w-fit">
				<div class="label">
					<span class="label-text">Minutes</span>
				</div>
				<input
					type="number"
					class="input input-bordered w-24"
					placeholder="Time (mins)"
					bind:value={setMinutes}
					disabled={isRunning}
					min="0"
					max="24"
				/>
			</label>

			<label class="form-control w-fit">
				<div class="label">
					<span class="label-text">Seconds</span>
				</div>
				<input
					type="number"
					class="input input-bordered w-24"
					placeholder="Time (secs)"
					bind:value={setSeconds}
					disabled={isRunning}
					min="0"
					max="24"
				/>
			</label>
		</div>

		<button on:click={setTime} class="btn btn-lg btn-info" disabled={isRunning}>Set Timer</button>

		<div class="divider max-w-sm mx-auto my-4">Break</div>

		<div class="flex flex-row gap-2 justify-center mb-4 mt-6">
			<label class="form-control w-fit">
				<div class="label">
					<span class="label-text">Hours</span>
				</div>
				<input
					type="number"
					class="input input-bordered w-24"
					placeholder="Time (hrs)"
					bind:value={setBreakHours}
					disabled={isRunning}
					min="0"
					max="24"
				/>
			</label>

			<label class="form-control w-fit">
				<div class="label">
					<span class="label-text">Minutes</span>
				</div>
				<input
					type="number"
					class="input input-bordered w-24"
					placeholder="Time (mins)"
					bind:value={setBreakMinutes}
					disabled={isRunning}
					min="0"
					max="24"
				/>
			</label>

			<label class="form-control w-fit">
				<div class="label">
					<span class="label-text">Seconds</span>
				</div>
				<input
					type="number"
					class="input input-bordered w-24"
					placeholder="Time (secs)"
					bind:value={setBreakSeconds}
					disabled={isRunning}
					min="0"
					max="24"
				/>
			</label>
		</div>

		<button on:click={setBreak} class="btn btn-lg btn-info" disabled={isRunning}>Set Break</button>
		<button on:click={startBreak} on:click={startTimer} class="btn btn-lg btn-success">Start Break</button>
		<button on:click={setTime} on:click={startTimer} class="btn btn-lg btn-error">Skip Break</button>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 20px;
	}
</style>
