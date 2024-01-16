<script>
	import { onDestroy, onMount } from 'svelte';

	let state = 'Idle';
	let animationInterval;
	let randomInterval;
	let positionX = 0;
	let animationCycles = 0;
	const MOVE_AMOUNT = 10;

	function walk(direction) {
		const isWalkingLeft = direction === 'left';
		if (
			(isWalkingLeft && positionX <= 0) ||
			(!isWalkingLeft && positionX >= document.body.clientWidth - 64)
		) {
			startIdleAnimation();
			return;
		}

		state = 'Walk';
		const scaleX = isWalkingLeft ? -1 : 1;
		document.getElementById('dogSprite').style.transform = `scaleX(${scaleX})`;
		positionX += isWalkingLeft ? -MOVE_AMOUNT : MOVE_AMOUNT;
		document.getElementById('dogSpriteContainer').style.transform = `translateX(${positionX}px)`;
	}

	function startAnimation() {
		randomInterval = setInterval(() => {
			if (animationCycles === 0) {
				startIdleAnimation();
				animationCycles++;
				return;
			}

			const shouldWalk = Math.random() < 0.5;
			if (shouldWalk) {
				startWalkAnimation();
			} else {
				startIdleAnimation();
			}
		}, 5000);
	}

	function startWalkAnimation() {
		const totalIntervals = 6;
		let currentInterval = 0;
		clearInterval(animationInterval);
		const direction = Math.random() < 0.5 ? 'left' : 'right';
		animationInterval = setInterval(() => {
			walk(direction);
			if (currentInterval <= totalIntervals) {
				currentInterval++;
			} else {
				currentInterval = 0;
			}
			document.getElementById('dogSprite').style.backgroundPositionX = `${currentInterval * -48}px`;
		}, 150);
	}

	function startIdleAnimation() {
		state = 'Idle';
		const totalIntervals = 4;
		let currentInterval = 0;
		clearInterval(animationInterval);
		animationInterval = setInterval(() => {
			if (currentInterval <= totalIntervals) {
				currentInterval++;
			} else {
				currentInterval = 0;
			}
			document.getElementById('dogSprite').style.backgroundPositionX = `${currentInterval * -48}px`;
		}, 200);
	}

	onMount(startAnimation);

	onDestroy(() => {
		clearInterval(animationInterval);
		clearInterval(randomInterval);
	});
</script>

<div class="relative">
	<div class="absolute bottom-0 mx-auto">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="dog-sprite-container"
			id="dogSpriteContainer"
			on:mousedown={() => startWalkAnimation()}
		>
			<div
				id="dogSprite"
				class="w-12 h-12"
				style="background-image: url('/dog/{state}.png');"
			></div>
		</div>
	</div>
</div>

<style>
	/* Style the container for the sprite animation */
	.dog-sprite-container {
		width: 48px;
		height: 48px;
		overflow: hidden;
		position: relative;
	}

	/* Position the sprite animation */
	#dogSprite {
		width: 48px;
		height: 48px;
		position: absolute;
	}
</style>
