<script lang="ts">
	import BackgroundVideo from './../../components/BackgroundVideo.svelte';
	// import { BackgroundVideo } from '@/components/';
</script>

<!-- annoyingly have to add z-10 since background video interferes with the svelte transitioned text in this section -->

<BackgroundVideo />

<a
	href="/plans"
	class="disableScrollOnThisPage z-10 flex h-[100vh] items-center justify-center text-center"
>
	<!-- style="position: fixed; top: 0;" -->
	<!-- since this component part of '/', moved this 'elastic-out' to the styles section there -->
	<div class="elastic-out z-10 grid grid-rows-1">
		<div class="pb-4 font-Poppins text-6xl">
			You're on the <span class="gradientTextColor"> App!</span>
		</div>

		<div class="grid px-6 font-Nunito text-2xl font-thin">the navbar is now your friend 🤝</div>
	</div>
</a>
