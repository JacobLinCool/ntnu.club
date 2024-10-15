<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let targetDate: Date;

	let timeLeft: { hours: number; minutes: number; seconds: number };
	let intervalId: number;

	function updateCountdown() {
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();

		if (difference > 0) {
			const hours = Math.floor(difference / (1000 * 60 * 60));
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			timeLeft = { hours, minutes, seconds };
		} else {
			timeLeft = { hours: 0, minutes: 0, seconds: 0 };
			clearInterval(intervalId);
		}
	}

	onMount(() => {
		updateCountdown();
		intervalId = setInterval(updateCountdown, 1000) as unknown as number;
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

{#if timeLeft}
	<div class="flex justify-center items-center space-x-4">
		<div class="flex flex-col items-center">
			<div class="text-4xl font-bold bg-base-200 rounded-lg p-3 w-20 text-center">
				{timeLeft.hours.toString().padStart(2, '0')}
			</div>
			<span class="text-sm mt-1">Hours</span>
		</div>
		<div class="text-4xl font-bold">:</div>
		<div class="flex flex-col items-center">
			<div class="text-4xl font-bold bg-base-200 rounded-lg p-3 w-20 text-center">
				{timeLeft.minutes.toString().padStart(2, '0')}
			</div>
			<span class="text-sm mt-1">Minutes</span>
		</div>
		<div class="text-4xl font-bold">:</div>
		<div class="flex flex-col items-center">
			<div class="text-4xl font-bold bg-base-200 rounded-lg p-3 w-20 text-center">
				{timeLeft.seconds.toString().padStart(2, '0')}
			</div>
			<span class="text-sm mt-1">Seconds</span>
		</div>
	</div>
{/if}
