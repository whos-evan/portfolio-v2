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

	let interval;
	function startTimer() {
		isRunning = true;
		interval = setInterval(() => {
			if (seconds > 0) {
				seconds--;
			} else if (minutes > 0) {
				minutes--;
				seconds = 59;
			} else if (hours > 0) {
				hours--;
				minutes = 59;
				seconds = 59;
			} else {
				clearInterval(interval);
				isRunning = false;
				isOnBreak = true;
				timer.play();
				transitionToBreak();
			}
		}, 1000);
	}

	function stopTimer() {
		clearInterval(interval);
		isRunning = false;
	}

	function restartTimer() {
		clearInterval(interval);
		isRunning = false;
		isOnBreak = false;
		hours = setHours;
		minutes = setMinutes;
		seconds = setSeconds;
	}

	function transitionToBreak() {
		clearInterval(interval);
		isRunning = false;
		isOnBreak = true;
	}

	function startBreak() {
		clearInterval(interval);
		isRunning = true;
		isOnBreak = true;

		interval = setInterval(() => {
			if (breakSeconds > 0) {
				breakSeconds--;
			} else if (breakMinutes > 0) {
				breakMinutes--;
				breakSeconds = 59;
			} else if (breakHours > 0) {
				breakHours--;
				breakMinutes = 59;
				breakSeconds = 59;
			} else {
				clearInterval(interval);
				isRunning = false;
				isOnBreak = false;
				timer.play();
				restartTimer();
			}
		}, 1000);
	}

	function stopBreak() {
		clearInterval(interval);
		isRunning = false;
	}

	function restartBreak() {
		clearInterval(interval);
		isRunning = false;
		isOnBreak = false;
		breakHours = setBreakHours;
		breakMinutes = setBreakMinutes;
		breakSeconds = setBreakSeconds;
	}

	function setTime() {
		hours = setHours;
		minutes = setMinutes;
		seconds = setSeconds;
	}

	function setBreak() {
		breakHours = setBreakHours;
		breakMinutes = setBreakMinutes;
		breakSeconds = setBreakSeconds;
	}

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

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
		<button on:click={isOnBreak ? startBreak : startTimer} class="btn btn-lg btn-success" disabled={isRunning}>Start</button>
		<button on:click={isOnBreak ? stopBreak : stopTimer} class="btn btn-lg btn-error" disabled={!isRunning}>Stop</button>
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
			<button on:click={restartBreak} on:click={startBreak} class="btn btn-lg btn-success">Start Break</button>
		{/if}
		{#if isOnBreak}
			<button on:click={restartTimer} on:click={restartBreak} on:click={startTimer} class="btn btn-lg btn-error">
				Skip Break
			</button>
		{/if}
	</div>

	<p>
		{isOnBreak}
		{isRunning}
	</p>
</main>

<style>
	main {
		text-align: center;
		padding: 20px;
	}
</style>
