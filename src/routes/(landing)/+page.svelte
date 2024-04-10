<script context="module">
	let prevTimesMounted = $state(0);
</script>

<script lang="ts">
	import BackgroundVideo from '@/components/BackgroundVideo.svelte';

	import { HomeworkPage, PlansPage } from '..';
	// import HomeworkPage from '@/routes/homework/+page.svelte';
	// import PlansPage from '@/routes/plans/+page.svelte';

	import HorizontalScrollReviews from '../reviews/HorizontalScrollReviews.svelte';
	import Reviews from '../reviews/Reviews.svelte';
	import { sleep } from '@/utils/utils';
	import { browser, dev } from '$app/environment';

	// If js is enabled then 'elasticOut' animation will play once.
	// With JS disabled the css animation plays on every navigation to this route .. which is superior to svelte js animation (doesnt work without js)
	if (browser && prevTimesMounted == 0) {
		sleep(1000) // required to not cut off the animation prematurely
			.then(() => prevTimesMounted++);
	}
</script>

<main class="group">
	<BackgroundVideo class="transition-transform duration-[2s] pwa:group-active:scale-[0.5]" />
	<!-- this section visible in pwa -->
	<section class="hidden pwa:block">
		<a
			href="/plans"
			class="flex h-[100vh] items-center justify-center text-center"
			style="position: fixed; top: 0;"
		>
			<div class="elasticOut z-10 grid grid-rows-1">
				<div class="pb-4 font-Poppins text-6xl">
					You're on the <span class="gradientTextColor"> App!</span>
				</div>

				<div class="grid px-6 font-Nunito text-2xl font-thin">the navbar is now your friend 🤝</div>
			</div>
		</a>
	</section>

	<!-- this section visible in notpwa -->
	<section class="block pwa:hidden">
		<div class="pwa grid grid-cols-1 gap-y-52 lg:gap-y-64">
			<a href="#step1" class=" z-10 flex h-[60vh] items-center justify-center text-center">
				<!-- annoyingly have to add z-10 since background video interferes with the svelte transitioned text in this section -->

				<!-- <div class:disable_animation={prevTimesMounted > 0} class="elasticOut grid grid-rows-1"> -->
				<div class:elasticOut={prevTimesMounted == 0} class="grid grid-rows-1">
					<div class="pb-4 font-Poppins text-6xl">
						{dev ? 'Demo' : ' Math, Physics'}

						<span class="gradientTextColor"> ... Online! </span>
					</div>

					<span class="animate-bounce font-Nunito text-2xl font-thin"> 👇 get started </span>
				</div>
			</a>

			<!-- second page -->
			<section
				id="step1"
				class="grid scroll-my-20 place-content-center duration-500 hover:scale-105"
			>
				<a href="#step2" class="pb-7 text-center font-Poppins text-5xl">
					<span class="gradientTextColor"> 1. Upload your homework </span>
				</a>

				<HomeworkPage />
			</section>

			<!-- third page -->
			<section id="step2" class="grid scroll-my-20 place-content-center duration-500">
				<a href="#reviews" class="pb-7 text-center font-Poppins text-5xl">
					<span class="gradientTextColor"> 2. Schedule a Session </span>
				</a>

				<PlansPage />
			</section>

			<!-- fourth page -->
			<section id="reviews" class="mb-[200px] scroll-my-20 duration-500 sm:mb-[500px]">
				<a href="#top" class="flex w-full justify-center text-center font-Poppins text-5xl">
					<span class="gradientTextColor"
						>3. Do Some Reading <span class="text-black">😎 </span></span
					>
				</a>

				<Reviews />
			</section>
		</div>
	</section>
</main>

<!-- <Schools /> -->

<style lang="postcss">
	/* dark:to-white; dark:from-red-300 dark:via-white */
	.gradientTextColor {
		@apply bg-gradient-to-tr from-indigo-600 to-black bg-clip-text text-transparent;
		:global(html.dark) & {
			@apply from-red-300 via-white to-white;
		}
	}
</style>
