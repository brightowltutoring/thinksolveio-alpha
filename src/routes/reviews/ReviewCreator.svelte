<script lang="ts">
	// import type { DebouncedScrollY } from '$routes/+layout.svelte';
	// import type { DebouncedScrollY } from '$lib/store/scrollStore.svelte';

	// let debouncedScrollY: DebouncedScrollY = getContext('debouncedScrollY');
	import { debouncedScrollY } from '@/shared/scrollStore.svelte';
	// import { getContext } from 'svelte';
	// let scrollY = getContext('scrollY');
	// // // let scrollY = getContext<() => number>('scrollY');
	// $effect(() => {
	// 	console.log(scrollY());
	// });

	let {
		title = '',
		name = '',
		date = '',
		children
	} = $props<{ title: string; name: string; date: string; children: Snippet }>();

	import { isDarkMode } from '@/shared/clientStore';

	import { spring } from 'svelte/motion';
	import type { Snippet } from 'svelte';

	const ORIGINAL_SPRING_VALUE = 0;
	const sineSpring = spring(ORIGINAL_SPRING_VALUE);

	// let timeout: NodeJS.Timeout;
	// function sineSpringSetter() {
	// 	console.log('hry');
	// 	if (timeout) clearTimeout(timeout);
	// 	if (!$isDarkMode) return;

	// 	sineSpring.set(0.3 * Math.sin(scrollY));
	// 	// sineSpring.set(0.3 * Math.sin($scrollY));

	// 	timeout = setTimeout(() => {
	// 		sineSpring.set(ORIGINAL_SPRING_VALUE);
	// 	}, 1500);
	// }

	// TODO: put back!
	$effect(() => {
		if ($isDarkMode) {
			// sineSpring.set(0.3 * Math.sin(scrollY()), { soft: 1 });
			sineSpring.set(0.3 * Math.sin(debouncedScrollY.value), { soft: 1 });
			// console.log('debouncedScrollY.value', debouncedScrollY.value);

			// sineSpring.set(0.3 * Math.sin(scrollY), { soft: 1 });
			// sineSpring.set(Math.sin(scrollY), { soft: 1 });
		}
	});

	// $effect(() => {
	// 	// scrollY && sineSpringSetter();
	// 	// scrollY && sineSpringSetter();
	// 	scrollY && console.log('hry');
	// });

	// $: $scrollY, sineSpringSetter();
	// $: scrollY, sineSpringSetter();
</script>

<review-card class="prose relative block dark:prose-invert md:pb-[5vw]">
	<review-card-contents class="absolute">
		<h1>{title}</h1>

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
			{@render children()}
		</div>

		<div class="absolute bottom-0 right-0 -my-10 mx-5 py-3 font-bold">
			{name}
		</div>
	</review-card-contents>
</review-card>

<style>
	:global(html.dark-mode) .flickerWhenDarkMode {
		animation: flickerWhenDarkMode 1.5s infinite;
	}
	@keyframes flickerWhenDarkMode {
		50% {
			filter: hue-rotate(0.06turn);
		}
	}
</style>
