<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { publish } from '$lib/notification';
	import QR from '$lib/component/QR.svelte';

	export let data: PageData;

	const origin = $page.url.origin;

	function copyToClipboard(text: string) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				publish({ type: 'info', message: `Copied: ${text}` });
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-6">Upcoming Events</h1>

	<div class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
		{#each data.events as event}
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">
						{event.title} <span class="badge badge-accent badge-outline">{event.code}</span>
					</h2>

					<div class="w-80">
						<QR text={`${origin}/${event.code}`} margin={2} />
					</div>

					<div class="card-actions justify-end">
						<button
							class="btn btn-sm btn-secondary"
							on:click={() => copyToClipboard(`${origin}/${event.code}`)}
						>
							Copy Short URL
						</button>
						<a
							href={event.url}
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-sm btn-primary"
						>
							View Event
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
