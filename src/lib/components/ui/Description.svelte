<script lang="ts">
	// interface Props {
	// 	description: string;
	// 	open?: boolean;
	// 	close: unknown
	// }
	import { fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	interface Props {
		description: string;
		open?: boolean;
		close: () => void;
	}

	const { description, open = false, close }: Props = $props();

	// const close = () => dispatch('close');
	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') close();
	};
</script>

<svelte:window on:keydown={onKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-40 flex items-center justify-center"
		transition:fade={{ duration: 200, easing: sineInOut }}
	>
		<div class="absolute inset-0 bg-black/65" on:click={() => close()} />
	</div>
{/if}
{#if open}
	<div class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
		<!-- <div class="absolute inset-0 bg-black/75" on:click={() => close()} /> -->
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Algorithm description"
			class="pointer-events-auto relative max-h-[80vh] w-[min(600px,90vw)] overflow-hidden rounded-xl bg-primary/25 shadow-lg backdrop-blur"
		>
			<div
				class="flex h-12 items-center justify-between border-b border-white/10 bg-primary/5 px-3"
			>
				<h2 class="text-lg font-medium">Description</h2>
				<button
					type="button"
					aria-label="Close"
					class="py- rounded px-2 text-2xl text-white/80 transition hover:bg-white/10 hover:text-white"
					on:click={() => close()}
				>
					x
				</button>
			</div>
			<div class="max-h-[calc(80vh-3rem)] overflow-y-auto p-3">
				<p class="text-justify text-sm">{description}</p>
			</div>
		</div>
	</div>
{/if}
