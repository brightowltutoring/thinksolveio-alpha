<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		navIconClicked = false,
		fillColor = '!fill-rose-600 dark:!fill-blue-600',
		size = 10,
		height = size,
		width = size,
		extraTW = '',
		children
	} = $props();

	// type Props = {
	// 	navIconClicked: boolean;
	// 	fillColor: string;
	// 	size: number;
	// 	height: number;
	// 	width: number;
	// 	extraTW: string;
	// 	children: Snippet;
	// };
</script>

<svg
	{width}
	{height}
	viewBox="0 0 {size} {size}"
	class={`origin-top  fill-black dark:fill-white ${navIconClicked && fillColor} ${extraTW} `}
>
	<!-- <slot /> -->
	{@render (children as Snippet)()}
</svg>
