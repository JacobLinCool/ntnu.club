<script lang="ts">
	import { page } from '$app/stores';
	import type { CommunityEventWithCode } from '$lib/event';
	import { publish } from '$lib/notification';
	import QR from '$lib/component/QR.svelte';

	export let event: CommunityEventWithCode;
	export let collapse: boolean = false;
	export let opacity: number = 1;

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

	function formatDate(date: string): string {
		return new Date(date).toLocaleString(undefined, {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="card card-compact bg-base-100 shadow-xl" style="opacity: {opacity};">
	<div class="card-body">
		<div class="collapse collapse-arrow">
			<input type="checkbox" checked={!collapse} />
			<div class="collapse-title p-0">
				<h2 class="card-title">
					{event.title}
				</h2>
				<div class="text-sm opacity-70 mt-1">
					{formatDate(event.start_date)} - {formatDate(event.end_date)}
				</div>
			</div>
			<div class="collapse-content">
				<div class="flex flex-col my-4">
					<div class="badge badge-accent badge-outline mx-auto">{event.code}</div>

					<div class="w-80 mx-auto">
						<QR text={`${origin}/${event.code}`} margin={2} />
					</div>

					<div class="card-actions justify-end mt-4">
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
		</div>
	</div>
</div>
