<script lang="ts">
	import { inview } from '@/utils/';

	let { class: _class = '' } = $props();

	function playVideo(target: Element) {
		let videoEl = target as HTMLVideoElement;
		if (videoEl?.paused) {
			videoEl.play();
			// console.log('play');
		}
	}
	function pauseVideo(target: Element) {
		(target as HTMLVideoElement)?.pause();
		// console.log('paused');
	}
</script>

<!-- autoplay -->
<video
	use:inview={{ enter: playVideo, leave: pauseVideo }}
	preload="auto"
	controlslist="nodownload"
	playsinline
	muted
	loop
	src="/login-bg-video-blurred.mp4"
	class="absolute top-0 h-screen w-11/12 object-cover blur-2xl dark:blur-3xl dark:hue-rotate-90 dark:invert-[0.95] {_class}"
></video>

<style>
	/* Previously used '-z-50 dark:z-0' to hide dark hover shadow on video control panel, but 'https://stackoverflow.com/questions/51719642/html5-video-player-remove-black-shadow-at-bottom-of-controls-section' gives this solution: */
	video::-webkit-media-controls-panel {
		background-image: linear-gradient(transparent, transparent) !important;
	}
	/* :global(html.dark) video {
		background-color: red;
	} */
</style>
