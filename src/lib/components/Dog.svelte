<script>
	import { onDestroy, onMount } from 'svelte';

	let state = 'Idle';

	onMount(() => {
		startAnimation();
	});

	onDestroy(() => {
		clearInterval(animationInterval);
		clearInterval(randomInterval);
	});

	let animationInterval;
	let randomInterval;
	let positionX = 0;
	let animationCycles = 0;
	const MOVE_AMOUNT = 24;

	function walkLeft() {
		// Ensure the dog doesn't walk off the screen
		if (positionX <= 0) {
			startIdleAnimation();
			return;
		}

		state = 'Walk';

		// change direction
		document.getElementById('dogSprite').style.transform = 'scaleX(-1)';

		document.getElementById('dogSpriteContainer').style.transform = `translateX(${
			positionX - MOVE_AMOUNT
		}px)`;
		positionX -= MOVE_AMOUNT;
	}

	function walkRight() {
		// Ensure the dog doesn't walk off the screen
		if (positionX >= document.body.clientWidth - 64) {
			state = 'Idle';

			startIdleAnimation();
			return;
		}

		state = 'Walk';

		// change direction
		document.getElementById('dogSprite').style.transform = 'scaleX(1)';

		document.getElementById('dogSpriteContainer').style.transform = `translateX(${
			positionX + MOVE_AMOUNT
		}px)`;

		positionX += MOVE_AMOUNT;
	}

	function startAnimation() {
		randomInterval = setInterval(() => {
			if (animationCycles == 0) {
				startIdleAnimation();
				animationCycles++;
				return;
			}

			let randomNumber = Math.random();
			if (randomNumber < 0.5) {
				startWalkAnimation();
			} else {
				startIdleAnimation();
			}
		}, 5000);
	}

	function startWalkAnimation() {
		let totalIntervals = 6;
		let currentInterval = 0;
		let direction = '';
		clearInterval(animationInterval);
		// randomly change direction
		const randomNumber = Math.random();
		if (randomNumber < 0.5) {
			direction = 'left';
		} else {
			direction = 'right';
		}
		animationInterval = setInterval(() => {
			if (direction === 'left') {
				walkLeft();
			} else {
				walkRight();
			}
			if (currentInterval <= totalIntervals) {
				currentInterval++;
			} else {
				currentInterval = 0;
			}
			document.getElementById('dogSprite').style.backgroundPositionX = `${currentInterval * -48}px`;
		}, 200);
	}

	function startIdleAnimation() {
		state = 'Idle';

		let totalIntervals = 4;
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
</script>

<div class="relative">
	<div class="absolute bottom-0 mx-auto">
		<div class="dog-sprite-container" id="dogSpriteContainer">
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
