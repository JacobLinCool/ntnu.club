<script lang="ts">
	import Countdown from '$lib/component/Countdown.svelte';
	import EventCard from '$lib/component/EventCard.svelte';
	import { splitEvents, type CommunityEventWithCode } from '$lib/event';

	export let events: CommunityEventWithCode[];

	const slices = splitEvents(events);
	const event = slices.current ?? slices.upcoming;
</script>

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-6 text-center">
		{slices.current ? 'Current Event' : slices.upcoming ? 'Upcoming Event' : 'No Event'}
	</h1>

	{#if event}
		<div class="max-w-4xl mx-auto mb-8">
			<div class="flex flex-col lg:flex-row lg:justify-between">
				<div class="lg:w-1/2 p-6 bg-base-200 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
					<div class="mb-6">
						<p class="text-lg mb-2 text-center font-semibold">
							{slices.upcoming ? 'Starts in:' : 'Ends in:'}
						</p>
						<div class="overflow-x-auto">
							<Countdown
								targetDate={slices.upcoming ? new Date(event.start_date) : new Date(event.end_date)}
							/>
						</div>
					</div>
				</div>
				<div class="lg:w-1/2">
					<EventCard {event} collapse={false} />
				</div>
			</div>
		</div>
	{:else}
		<p class="text-center text-lg mb-8">No current or upcoming events within the next hour.</p>
	{/if}

	{#if slices.next.length > 0}
		<div class="max-w-4xl mx-auto mb-8">
			<h2 class="text-2xl font-bold mb-4 text-center">Future Events</h2>
			<div class="space-y-4">
				{#each slices.next as nextEvent, i}
					<EventCard event={nextEvent} collapse={!event && i === 0 ? false : true} />
				{/each}
			</div>
		</div>
	{/if}

	{#if slices.past.length > 0}
		<div class="max-w-4xl mx-auto">
			<h2 class="text-2xl font-bold mb-4 text-center">Past Events</h2>
			<div class="space-y-4">
				{#each slices.past as pastEvent}
					<EventCard event={pastEvent} collapse={true} opacity={0.6} />
				{/each}
			</div>
		</div>
	{/if}
</div>
