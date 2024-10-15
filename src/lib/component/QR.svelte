<script lang="ts">
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	export let text: string;
	export let width: number = 400;
	export let margin: number | undefined = undefined;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		QRCode.toCanvas(canvas, text, { width, margin });
	});
</script>

<canvas class="!w-full !h-full" bind:this={canvas}></canvas>
