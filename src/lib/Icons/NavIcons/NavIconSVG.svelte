<script lang="ts">
	export let navIconClicked = false;
	export let fillColor = '!fill-rose-600 dark:!fill-blue-600';
	export let size: number;
	export let height = size;
	export let width = size;
	export let extraTW = '';
</script>

<svg
	{width}
	{height}
	viewBox="0 0 {size} {size}"
	class={`origin-top  fill-black dark:fill-white ${navIconClicked && fillColor} ${extraTW} `}
>
	<slot />
</svg>
