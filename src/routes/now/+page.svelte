<script lang="ts">
	import type { PageData } from './$types';
	import Dashboard from '$lib/component/Dashboard.svelte';

	export let data: PageData;
</script>

<Dashboard events={data.events} />
