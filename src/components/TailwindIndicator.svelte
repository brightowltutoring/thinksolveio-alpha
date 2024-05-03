<div
	class="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white"
>
	<div class="block sm:hidden">xs</div>
	<div class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">sm</div>
	<div class="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
	<div class="hidden lg:block xl:hidden 2xl:hidden">lg</div>
	<div class="hidden xl:block 2xl:hidden">xl</div>
	<div class="hidden 2xl:block">2xl</div>
</div>

<!-- TODO: This previously caused DEV to hang -->
<!-- <script lang="ts">
	import { dev } from '$app/environment';
	let { devOnly = true } = $props();
</script>

{#if devOnly && dev}
	{@render tw_indicator()}
{:else if !devOnly}
	{@render tw_indicator()}
	{console.log('note: tailwind indicator in prod')}
{/if}

{#snippet tw_indicator()}
	<div
		class="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white"
	>
		<div class="block sm:hidden">xs</div>
		<div class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">sm</div>
		<div class="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
		<div class="hidden lg:block xl:hidden 2xl:hidden">lg</div>
		<div class="hidden xl:block 2xl:hidden">xl</div>
		<div class="hidden 2xl:block">2xl</div>
	</div>
{/snippet} -->
