<!-- Old example: ... maybe only use context for sensitive global state -->
<!-- <script context="module" lang="ts">
	import { createContext, debounce } from '@/utils';

	export const [provideDebouncedScrollY, consumeDebouncedScrollY] = createContext<() => number>();
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();

	let debouncedScrollY = $state(0);
	provideDebouncedScrollY(() => debouncedScrollY);
</script>

<svelte:window onscroll={debounce(() => (debouncedScrollY = window.scrollY), 40)} />

{@render children()} -->
