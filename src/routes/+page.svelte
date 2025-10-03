<script lang="ts">
	import { config, numbers, metrics } from '$lib/stores';
	import { algorithms } from '$lib/util/algorithms';
	import { shuffle } from '$lib/util';
	import Sorter from '$lib/components/Sorter.svelte';
	import { getSortedNumbers } from '$lib/util/constants';
	import { Button } from '$lib/components/ui/button';
	import Play from 'lucide-svelte/icons/play';
	import Shuffle from 'lucide-svelte/icons/shuffle';
	import Description from '$lib/components/ui/Description.svelte';
	import { Slider } from '$lib/components/ui/slider';
	import { Label } from '$lib/components/ui/label';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Info from 'lucide-svelte/icons/info';

	let countSlider = $state([100]);
	let delaySlider = $state([Math.log($config.delay)]);
	let showDescription = $state(false);

	const algorithm = $derived(algorithms[$config.selectedAlgorithm]);

	$effect(() => {
		$numbers = getSortedNumbers(countSlider[0]);
	});

	$effect(() => {
		$config.delay = Math.exp(delaySlider[0]);
	});

	const handleShuffle = () => {
		shuffle();
	};

	const handleSort = async () => {
		$metrics.status = 'running';
		algorithm.sort();
	};
</script>

<svelte:head><title>Sorting Algorithm Visualizer</title></svelte:head>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<div class="flex flex-1">
		<!-- <div
			class="m-4 flex w-64 min-w-min flex-col items-center justify-center gap-y-10 overflow-y-auto"
		>
			<Description description={algorithm.description} />
		</div> -->

		<div class="flex h-full flex-1 flex-col gap-2 p-3">
			<div class="grid grid-cols-12 items-center justify-items-center space-y-2">
				<div class="col-span-6 ml-auto flex min-w-48 justify-center gap-2 lg:col-span-3 lg:m-auto">
					<Button onclick={handleSort} disabled={$metrics.status !== 'idle'} class="px-2 transition"
						><Play /></Button
					>
					<Button
						onclick={handleShuffle}
						disabled={$metrics.status !== 'idle'}
						class="px-2 transition"><Shuffle /></Button
					>
				</div>
				<div class="col-span-6 mr-auto flex gap-2 lg:col-span-3 lg:m-auto">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger disabled={$metrics.status !== 'idle'}>
							<div
								class="mx-auto flex w-min whitespace-nowrap rounded-sm bg-transparent p-2 transition hover:bg-white/10"
							>
								{algorithm.name}<ChevronDown />
							</div>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Label>Sorting algorithms</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.RadioGroup bind:value={$config.selectedAlgorithm}>
									{#each Object.entries(algorithms) as [id, algorithm] (id)}
										<DropdownMenu.RadioItem value={id}>{algorithm.name}</DropdownMenu.RadioItem>
									{/each}
								</DropdownMenu.RadioGroup>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					<div class="flex">
						<Button class="px-2" onclick={() => (showDescription = true)}>
							<Info />
						</Button>
					</div>
				</div>
				<div class="col-span-12 grid grid-cols-2 justify-evenly gap-3 lg:col-span-6">
					<div class="col-span-2 flex w-48 flex-col gap-2.5 md:col-span-1">
						<Label for="count" class="whitespace-nowrap text-center">Count: {countSlider[0]}</Label>
						<Slider
							disabled={$metrics.status !== 'idle'}
							id="count"
							bind:value={countSlider}
							max={500}
							min={1}
							step={1}
						/>
					</div>

					<div class="col-span-2 flex w-48 flex-col gap-2.5 md:col-span-1">
						<Label for="delay" class="whitespace-nowrap text-center"
							>Delay: {Math.round($config.delay * 100) / 100}ms</Label
						>
						<Slider
							id="delay"
							bind:value={delaySlider}
							max={Math.log(500)}
							min={Math.log(1)}
							step={0.001}
						/>
					</div>
				</div>
			</div>
			<Sorter />
			<div class="h-3 text-center text-xs text-neutral-400">
				Built and designed by Jordan Pinnick.
			</div>
		</div>
	</div>

	<!-- Description modal -->
	<Description
		description={algorithm.description}
		open={showDescription}
		close={() => (showDescription = false)}
	/>
</div>
