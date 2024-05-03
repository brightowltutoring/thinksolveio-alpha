<script lang="ts">
	import { type Snippet } from 'svelte';

	let { children, loading, fallback }: SuspenseProps = $props();

	import Skeleton from '@/components/loaders/Skeleton.svelte';
	import type { loadStatus } from '@/utils/types';

	type SuspenseProps = {
		children: Snippet;
		loading: loadStatus;
		fallback?: Snippet | string;
	};
</script>

{#if loading === 'pending'}
	{#if typeof fallback === 'string'}
		{fallback}
	{:else if fallback}
		{@render fallback()}
	{:else}
		<Skeleton />
	{/if}
{/if}

<div
	class:fly-fade={loading === 'success'}
	class="absolute -bottom-20 z-50 flex h-[90%] w-full items-center justify-center rounded-xl border-dotted border-gray-500 opacity-0 backdrop-blur-3xl ease-in md:top-40 md:h-full md:w-[80%]"
>
	{@render children()}
</div>

<style lang="postcss">
	.fly-fade {
		transition:
			top 0.8s,
			opacity 1.4s;
		top: 0;
		bottom: auto;
		opacity: 1;

		@media only screen and (max-width: 768px) {
			transition:
				bottom 0.8s,
				opacity 1s;
			bottom: 0;
			top: auto;
		}
	}
</style>
