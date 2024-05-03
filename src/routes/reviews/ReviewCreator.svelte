<script lang="ts">
	import type { Snippet } from 'svelte';
	type Props = {
		title: string;
		name: string;
		date: string;
		children: Snippet;
	};
	let { title = '', name = '', date = '', children }: Props = $props();

	import { getIsDarkMode, getDebouncedScrollY } from '@/components/root/';
	// import { getIsDarkMode } from '@/components/root/Theme.svelte';
	// import { getDebouncedScrollY } from '@/components/root/DebouncedScrollY.svelte';
	import { spring } from 'svelte/motion';

	const debouncedScrollY = $derived(getDebouncedScrollY());
	const ORIGINAL_SPRING_VALUE = 0;
	const sineSpring = spring(ORIGINAL_SPRING_VALUE);

	$effect(() => {
		if (getIsDarkMode()) {
			sineSpring.set(0.3 * Math.sin(debouncedScrollY), { soft: 1 });
		}
	});
</script>

<review-card class="prose relative block dark:prose-invert md:pb-[5vw]">
	<review-card-contents
		class="absolute rounded-lg p-10 duration-500 sm:hover:bg-white/60 sm:hover:drop-shadow-2xl sm:dark:hover:bg-inherit sm:dark:hover:drop-shadow-none"
	>
		<h1 class="font-extrabold">{title}</h1>

		<div class="flex flex-row">
			{#each Array(5) as _}
				<img
					style={`filter:hue-rotate(${$sineSpring}turn)`}
					class="flickerWhenDarkMode h-10 w-10 transition-transform duration-200 ease-in hover:scale-110"
					src="/star.webp"
					alt="star"
				/>
				<!-- <Star /> -->
			{/each}
		</div>

		<div class="italic">on {date}</div>

		<div class="py-3">
			<!-- <slot /> -->
			{@render children?.()}
		</div>

		<div class="absolute bottom-0 right-0 -my-10 mx-5 py-3 font-bold">
			{name}
		</div>
	</review-card-contents>
</review-card>

<style>
	:global(html.dark) .flickerWhenDarkMode {
		animation: flickerWhenDarkMode 1.5s infinite;
	}
	@keyframes flickerWhenDarkMode {
		50% {
			filter: hue-rotate(0.06turn);
		}
	}
</style>
