<script lang="ts">
	import type { Notify } from '$lib/notification';

	export let notifies: Notify[];
</script>

<div class="z-[1000] absolute p-4">
	<div class="toast toast-bottom toast-center w-full max-w-sm">
		{#each notifies as notify (notify.id)}
			<div
				class="alert shadow w-full"
				class:alert-success={notify.type === 'success'}
				class:alert-info={notify.type === 'info'}
				class:alert-warning={notify.type === 'warning'}
				class:alert-error={notify.type === 'error'}
			>
				<div class="max-w-full whitespace-break-spaces">
					{notify.message}
				</div>
			</div>
		{/each}
	</div>
</div>
