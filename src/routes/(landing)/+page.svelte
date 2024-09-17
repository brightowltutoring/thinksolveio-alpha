<script module>
	let prevTimesMounted = $state(0);
	console.log('prevTimesMounted', prevTimesMounted);
</script>

<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { BackgroundVideo } from '@/components/';
	import { HomeworkPage, PlansPage, ReviewsPage } from '@/routes/';
	import { sleep } from '@/utils/';

	// import ReviewsPage from '@/routes/reviews/Reviews.svelte';
	// If js is enabled then 'elastic-out' animation will play once.
	// With JS disabled the css animation plays on every navigation to this route .. which is superior to svelte js animation (doesnt work without js)
	if (browser && prevTimesMounted === 0) {
		sleep(1000) // required to not cut off the animation prematurely
			.then(() => prevTimesMounted++);
	}
</script>

<main class="group">
	<BackgroundVideo class="transition-transform duration-[2s] pwa:group-active:scale-[0.5]" />

	<!-- this section visible in NOT display-mode:standalone  -->
	<regular-section class="block pwa:hidden">
		<div class="pwa grid grid-cols-1 gap-y-52 lg:gap-y-64">
			<a href="#step1" class=" z-10 flex h-[60vh] items-center justify-center text-center">
				<!-- annoyingly have to add z-10 since background video interferes with the svelte transitioned text in this section -->

				<!-- <div class:disable_animation={prevTimesMounted > 0} class="elastic-out grid grid-rows-1"> -->
				<div class:elastic-out={prevTimesMounted === 0} class="grid grid-rows-1">
					<div class="pb-4 font-Poppins text-6xl">
						<!-- {dev ? 'Demo' : ' Math, Physics'} -->
						<!-- stopped working in svelte 5 alpha 152 -->
						{#if dev}
							Demo
						{:else}
							Math, Physics
						{/if}

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

				<ReviewsPage />
			</section>
		</div>
	</regular-section>

	<!-- this section visible in display-mode:standalone  -->
	<pwa-section class="hidden pwa:block">
		<a
			href="/plans"
			class="flex h-[100vh] items-center justify-center text-center"
			style="position: fixed; top: 0;"
		>
			<div class="elastic-out z-10 grid grid-rows-1">
				<div class="pb-4 font-Poppins text-6xl">
					You're on the <span class="gradientTextColor"> App!</span>
				</div>

				<div class="grid px-6 font-Nunito text-2xl font-thin">the navbar is now your friend 🤝</div>
			</div>
		</a>
	</pwa-section>
</main>

<!-- <Schools /> -->

<!-- <style lang="postcss"> -->
<style>
	/* dark:to-white; dark:from-red-300 dark:via-white */
	/*TODO: moved to app.css */
	/* .gradientTextColor {
		@apply bg-gradient-to-tr from-indigo-600 to-black bg-clip-text text-transparent;
		:global(html.dark) & {
			@apply from-red-300 via-white to-white;
		}
	} */

	/* moved from app.css to here, since only used here */
	.elastic-out {
		/* animation: quarter-step 0.8s var(--easing) 0.2s; */
		animation: quarter-step 0.8s var(--easing);
		--easing: ease-in-out;
		--displ: 5%;
		--transform-default: translateY(0);
		--transform-25: translateY(calc(-10 * var(--displ)));
		--transform-50: translateY(calc(5 * var(--displ)));
		--transform-75: translateY(calc(-2 * var(--displ)));
	}

	@keyframes quarter-step {
		0%,
		100% {
			transform: var(--transform-default);
		}
		25% {
			transform: var(--transform-25);
		}
		50% {
			transform: var(--transform-50);
		}
		75% {
			transform: var(--transform-75);
		}
	}
</style>
