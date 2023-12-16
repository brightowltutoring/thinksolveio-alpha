<script context="module">
	let prevTimesMounted = 0;
</script>

<script lang="ts">
	import BackgroundVideo from '$lib/BackgroundVideo.svelte';
	import DropzoneOpener from './homework/DropzoneOpener.svelte';
	import PlansSection from './plans/+page.svelte';
	import HorizontalScrollReviews from './reviews/HorizontalScrollReviews.svelte';
	import Reviews from './reviews/Reviews.svelte';
	import { sleep } from '$lib/utils';
	import { browser } from '$app/environment';

	// If js is enabled then 'elasticOut' animation will play once.
	// With JS disabled the css animation plays on every navigation to this route .. which is superior to svelte js animation (doesnt work without js)
	if (browser && prevTimesMounted == 0) {
		sleep(1000) // required to not cut off the animation prematurely
			.then(() => prevTimesMounted++);
	}
</script>

<BackgroundVideo />

<div class="grid grid-cols-1 gap-y-52 lg:gap-y-64">
	<a href="#step1" class=" z-10 flex h-[60vh] items-center justify-center text-center">
		<!-- annoyingly have to add z-10 since background video interferes with the svelte transitioned text in this section -->

		<!-- <div class:disable_animation={prevTimesMounted > 0} class="elasticOut grid grid-rows-1"> -->
		<div class:elasticOut={prevTimesMounted == 0} class="grid grid-rows-1">
			<div class="pb-4 font-Poppins text-6xl">
				Math, Physics
				<span class="gradientTextColor"> ... Online! </span>
			</div>

			<button class="animate-bounce font-Nunito text-2xl font-thin"> 👇 get started </button>
		</div>
	</a>

	<!-- second page -->
	<section id="step1" class="grid scroll-my-20 place-content-center duration-500 hover:scale-105">
		<a href="#step2" class="pb-7 text-center font-Poppins text-5xl">
			<span class="gradientTextColor"> 1. Upload your homework </span>
		</a>

		<DropzoneOpener />
	</section>

	<!-- third page -->
	<section id="step2" class="grid scroll-my-20 place-content-center duration-500">
		<a href="#reviews" class="pb-7 text-center font-Poppins text-5xl">
			<span class="gradientTextColor"> 2. Schedule a Session </span>
		</a>

		<PlansSection />
	</section>

	<!-- fourth page -->
	<section id="reviews" class="mb-[200px] scroll-my-20 duration-500 sm:mb-[500px]">
		<a href="#top" class="flex w-full justify-center text-center font-Poppins text-5xl">
			<span class="gradientTextColor">3. Do Some Reading <span class="text-black">😎 </span></span>
		</a>

		<Reviews class="hidden sm:block" />

		<HorizontalScrollReviews class="block sm:hidden " />
	</section>
</div>

<!-- <Schools /> -->

<style lang="postcss">
	.gradientTextColor {
		@apply bg-gradient-to-tr from-indigo-600 to-black bg-clip-text text-transparent dark:from-red-300 dark:via-white dark:to-white;
	}
	/* :global(html.dark-mode) .gradientTextColor {
		@apply from-red-300 via-white to-white;
	} */
</style>
