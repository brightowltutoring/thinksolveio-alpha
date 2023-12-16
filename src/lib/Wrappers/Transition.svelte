<!-- this is required to transition on initial page load or refresh ... since SvelteKit SSR's the initial page load   -->
<!-- later add 'OUT' functionality -->
<script lang="ts">
	import { onMount } from 'svelte';

	export let IN: Function;
	export let OPTS: object = {};

	let ready = false;
	onMount(() => (ready = true));
</script>

{#key ready}
	<div in:IN={ready && OPTS}>
		<slot />
	</div>
{/key}
