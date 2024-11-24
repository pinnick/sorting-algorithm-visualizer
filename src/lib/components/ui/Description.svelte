<script lang="ts">
	interface Props {
		description: string;
	}

	const { description }: Props = $props();
</script>

<div class="flex h-screen flex-col">
	<div class="flex h-16 items-center justify-center border-b border-white/10 bg-primary/5">
		<h2 class="text-lg font-medium">Description</h2>
	</div>
	<div class="flex-1 overflow-y-auto">
		<p class="p-3 text-justify text-sm">{description}</p>
	</div>
	<!-- <div>
		<h2 class="text-center text-xl">Complexity Analysis</h2>
		<div class="grid grid-cols-2">
			{#each complexityAnalysis as complexityInfo}
				<div>
					<p class="capitalize">{complexityInfo.name}</p>
					<div class="text-sm">
						<p>BEST: {complexityInfo.best}</p>
						<p>AVG: {complexityInfo.average}</p>
						<p>WORST: {complexityInfo.worst}</p>
					</div>
				</div>
			{/each}
		</div>
	</div> -->
</div>
