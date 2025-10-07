<script lang="ts">
	import { onDestroy } from 'svelte';

	let hours = 0;
	let minutes = 25;
	let seconds = 0;

	let breakHours = 0;
	let breakMinutes = 5;
	let breakSeconds = 0;

	let setHours = 0;
	let setMinutes = 25;
	let setSeconds = 0;

	let setBreakHours = 0;
	let setBreakMinutes = 5;
	let setBreakSeconds = 0;

	let isRunning = false;
	let isOnBreak = false;

	let interval: ReturnType<typeof setInterval> | undefined;
	let startTime: number;
	let totalDuration: number; // Total duration in seconds
	let pausedTime = 0; // Time paused in seconds

	function getTotalSeconds(h: number, m: number, s: number): number {
		return h * 3600 + m * 60 + s;
	}

	function updateDisplay(remainingSeconds: number) {
		hours = Math.floor(remainingSeconds / 3600);
		minutes = Math.floor((remainingSeconds % 3600) / 60);
		seconds = remainingSeconds % 60;
	}

	function updateBreakDisplay(remainingSeconds: number) {
		breakHours = Math.floor(remainingSeconds / 3600);
		breakMinutes = Math.floor((remainingSeconds % 3600) / 60);
		breakSeconds = remainingSeconds % 60;
	}

	function tick() {
		const elapsed = Math.floor((Date.now() - startTime) / 1000) + pausedTime;
		const remaining = Math.max(0, totalDuration - elapsed);

		if (isOnBreak) {
			updateBreakDisplay(remaining);
		} else {
			updateDisplay(remaining);
		}

		if (remaining <= 0) {
			clearInterval(interval);
			isRunning = false;
			
			const timer = document.getElementById('timer') as HTMLAudioElement;
			timer?.play();

			if (isOnBreak) {
				// Break finished, restart timer
				isOnBreak = false;
				restartTimer();
			} else {
				// Timer finished, start break
				transitionToBreak();
			}
		}
	}

	function startTimer() {
		if (!isRunning) {
			totalDuration = getTotalSeconds(setHours, setMinutes, setSeconds);
			if (totalDuration === 0) return;
			
			// If resuming from pause, calculate remaining time
			if (pausedTime > 0) {
				const currentRemaining = getTotalSeconds(hours, minutes, seconds);
				pausedTime = totalDuration - currentRemaining;
			}
			
			startTime = Date.now();
			isRunning = true;
			isOnBreak = false;
			
			// Update display immediately
			tick();
			
			interval = setInterval(tick, 100); // Check more frequently for accuracy
		}
	}

	function stopTimer() {
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}
		
		if (isRunning) {
			// Calculate how much time has passed and store it
			const elapsed = Math.floor((Date.now() - startTime) / 1000);
			pausedTime += elapsed;
		}
		
		isRunning = false;
	}

	function restartTimer() {
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}
		isRunning = false;
		isOnBreak = false;
		pausedTime = 0;
		hours = setHours;
		minutes = setMinutes;
		seconds = setSeconds;
	}

	function transitionToBreak() {
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}
		isRunning = false;
		isOnBreak = true;
		pausedTime = 0;
		breakHours = setBreakHours;
		breakMinutes = setBreakMinutes;
		breakSeconds = setBreakSeconds;
	}

	function startBreak() {
		if (!isRunning) {
			totalDuration = getTotalSeconds(setBreakHours, setBreakMinutes, setBreakSeconds);
			if (totalDuration === 0) return;
			
			// If resuming from pause, calculate remaining time
			if (pausedTime > 0) {
				const currentRemaining = getTotalSeconds(breakHours, breakMinutes, breakSeconds);
				pausedTime = totalDuration - currentRemaining;
			}
			
			startTime = Date.now();
			isRunning = true;
			isOnBreak = true;
			
			// Update display immediately
			tick();
			
			interval = setInterval(tick, 100);
		}
	}

	function stopBreak() {
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}
		
		if (isRunning) {
			// Calculate how much time has passed and store it
			const elapsed = Math.floor((Date.now() - startTime) / 1000);
			pausedTime += elapsed;
		}
		
		isRunning = false;
	}

	function restartBreak() {
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}
		isRunning = false;
		isOnBreak = false;
		pausedTime = 0;
		breakHours = setBreakHours;
		breakMinutes = setBreakMinutes;
		breakSeconds = setBreakSeconds;
	}

	function skipBreak() {
		restartBreak();
		restartTimer();
		startTimer();
	}

	function setTime() {
		hours = setHours;
		minutes = setMinutes;
		seconds = setSeconds;
		pausedTime = 0;
	}

	function setBreak() {
		breakHours = setBreakHours;
		breakMinutes = setBreakMinutes;
		breakSeconds = setBreakSeconds;
		pausedTime = 0;
	}

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<svelte:head>
	<title>evan - pomodoro timer</title>
	<meta name="description" content="a simple pomodoro timer" />
</svelte:head>

<audio src="/audio/timer.wav" id="timer" />
<audio src="/audio/timer-done-special.wav" id="timerSpecial" />

<main>
	<h1 class="sm:text-7xl text-5xl font-black">Pomodoro Timer</h1>
	<div class="mt-10 mb-10">
		<div class="grid grid-flow-col gap-5 text-center auto-cols-max w-fit mx-auto">
			<div class="flex flex-col p-2 bg-base-200 rounded-box text-content">
				<span class="countdown font-mono text-5xl sm:text-8xl">
					{#if isOnBreak}
						<span style="--value:{breakHours};"></span>
					{:else}
						<span style="--value:{hours};"></span>
					{/if}
				</span>
				hours
			</div>
			<div class="flex flex-col p-2 bg-base-200 rounded-box text-content">
				<span class="countdown font-mono text-5xl sm:text-8xl">
					{#if isOnBreak}
						<span style="--value:{breakMinutes};"></span>
					{:else}
						<span style="--value:{minutes};"></span>
					{/if}
				</span>
				min
			</div>
			<div class="flex flex-col p-2 bg-base-200 rounded-box text-content">
				<span class="countdown font-mono text-5xl sm:text-8xl">
					{#if isOnBreak}
						<span style="--value:{breakSeconds};"></span>
					{:else}
						<span style="--value:{seconds};"></span>
					{/if}
				</span>
				sec
			</div>
		</div>
	</div>

	<div class="flex flex-row gap-2 justify-center">
		<button
			on:click={isOnBreak ? startBreak : startTimer}
			class="btn btn-lg btn-success"
			disabled={isRunning}>Start</button
		>
		<button
			on:click={isOnBreak ? stopBreak : stopTimer}
			class="btn btn-lg btn-error"
			disabled={!isRunning}>Stop</button
		>
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
		{#if !isOnBreak}
			<button on:click={restartBreak} on:click={startBreak} class="btn btn-lg btn-success"
				>Start Break</button
			>
		{/if}
		{#if isOnBreak}
			<button on:click={skipBreak} class="btn btn-lg btn-error"> Skip Break </button>
		{/if}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 20px;
	}
</style>
