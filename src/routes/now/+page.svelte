<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import QR from '$lib/component/QR.svelte';
	import Countdown from '$lib/component/Countdown.svelte';

	export let data: PageData;

	const origin = $page.url.origin;

	function getCurrentOrUpcomingEvent(events: any[]) {
		const now = new Date();
		const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

		const current = events.find((event) => {
			const startDate = new Date(event.start_date);
			const endDate = new Date(event.end_date);
			return startDate <= now && endDate >= now;
		});
		if (current) return current;

		const upcoming = events.find((event) => {
			const startDate = new Date(event.start_date);
			return startDate > now && startDate < oneHourFromNow;
		});
		return upcoming;
	}

	const event = getCurrentOrUpcomingEvent(data.events);
	const isUpcoming = event && new Date(event.start_date) > new Date();
</script>

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-6 text-center">
		{isUpcoming ? 'Upcoming Event' : 'Current Event'}
	</h1>

	{#if event}
		<div class="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg overflow-hidden">
			<div class="flex flex-col lg:flex-row-reverse lg:justify-between">
				<div class="order-1 lg:order-2 lg:w-1/2 p-6">
					<h2 class="text-2xl font-semibold mb-4 text-center lg:text-left">{event.title}</h2>
					<div class="flex justify-center lg:justify-start">
						<QR text={`${origin}/${event.code}`} margin={2} />
					</div>
				</div>
				<div class="order-2 lg:order-1 lg:w-1/2 p-6 bg-base-200">
					<div class="mb-6">
						<p class="text-lg mb-2 text-center font-semibold">
							{isUpcoming ? 'Starts in:' : 'Ends in:'}
						</p>
						<div class="overflow-x-auto">
							<Countdown
								targetDate={isUpcoming ? new Date(event.start_date) : new Date(event.end_date)}
							/>
						</div>
					</div>
					<div class="space-y-4">
						<div class="flex flex-col items-center bg-base-100 rounded-lg p-4">
							<span class="text-sm font-semibold mb-1">Start Time</span>
							<p class="text-lg">
								{new Date(event.start_date).toLocaleString()}
							</p>
						</div>
						<div class="flex flex-col items-center bg-base-100 rounded-lg p-4">
							<span class="text-sm font-semibold mb-1">End Time</span>
							<p class="text-lg">
								{new Date(event.end_date).toLocaleString()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p class="text-center text-lg">No current or upcoming events within the next hour.</p>
	{/if}
</div>
