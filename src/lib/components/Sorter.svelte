<script lang="ts">
	import { numbers } from '$lib/stores';
	import { colors } from '$lib/util/constants';

	let w = $state() as number;

	// Show border if individual bar is greater than 6 pixels wide
	const showBorder: boolean = $derived(w / $numbers.length > 6);
</script>

<div class="flex flex-1 items-end border-2 dark:bg-primary/15" bind:clientWidth={w}>
	{#each $numbers as { value, color }}
		<div
			style="height: {value * 100}%; background-color: {colors[color]}"
			class="w-full border {showBorder ? 'border-black' : 'border-transparent'}"
		></div>
	{/each}
</div>
