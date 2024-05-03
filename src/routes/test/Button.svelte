<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		// children: Snippet;
	}

	let { children, ...attributes }: Props = $props();
</script>

<button {...attributes}>
	{@render children?.()}
</button>
