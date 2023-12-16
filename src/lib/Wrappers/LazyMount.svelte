<script lang="ts">
	import InView from './InView.svelte';

	export let Import: () => Promise<{ default: any }>;

	let Component: { default: any } | undefined;
	const getComponent = async () => (Component = await Import());
</script>

<InView onview={getComponent}>
	{#if Component}
		<Component.default {...$$props} />
	{/if}
</InView>

<!-- <div use:useInView={{ onview: getComponent }}>
	{#if Component}
		<Component.default {...$$props} />
	{/if}
</div> -->
