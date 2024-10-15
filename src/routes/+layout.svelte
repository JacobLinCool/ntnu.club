<script lang="ts">
	import '../app.css';
	import Notification from '$lib/component/Notification.svelte';
	import { notifies } from '$lib/notification';
</script>

<slot />

<Notification notifies={$notifies} />
