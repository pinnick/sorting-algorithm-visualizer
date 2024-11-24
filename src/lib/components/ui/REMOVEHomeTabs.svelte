<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';

	import type { Snippet } from 'svelte';

	interface Props {
		config: Snippet;
		info: Snippet;
		project: Snippet;
	}

	let { config, info, project }: Props = $props();
</script>

<Tabs.Root value="config" class="w-full ">
	<Tabs.List class="w-full">
		<Tabs.Trigger value="config" class="w-full">Config</Tabs.Trigger>
		<Tabs.Trigger value="info" class="w-full">Info</Tabs.Trigger>
		<Tabs.Trigger value="project" class="w-full">Project</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="config">
		{@render config()}
	</Tabs.Content>
	<Tabs.Content value="info">
		{@render info()}
	</Tabs.Content>
	<Tabs.Content value="project">
		{@render project()}
	</Tabs.Content>
</Tabs.Root>
