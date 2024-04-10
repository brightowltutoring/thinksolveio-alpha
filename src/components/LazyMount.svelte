<!-- Untested migration  -->
<!-- TODO:..This probably is easier with snippets -->
<script lang="ts">
	import type { ComponentType } from 'svelte';
	import InView from './wrappers/InView.svelte';

	type PropsType = {
		Import: () => Promise<{ default: ComponentType }>;
		attrs: any;
	};
	let { Import, ...attrs }: PropsType = $props();

	let Component: ComponentType;
	const getComponent = async () => {
		Component = (await Import()).default;
	};
</script>

<InView onview={getComponent}>
	{#if Component}
		<Component {...attrs} />
	{/if}
</InView>
