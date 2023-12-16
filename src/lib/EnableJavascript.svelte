<noscript>
	<div
		class="fixed left-0 top-0 z-50 flex w-full place-items-center justify-center bg-rose-500 p-7 text-center font-Poppins text-2xl"
	>
		<span> Please enable Javascript to continue using this page. </span>
	</div>
</noscript>

<style>
	:root {
		--hueRotateMaxAngle: 5deg;
	}

	div {
		filter: hue-rotate(0deg);
		animation: flicker 2s infinite;
	}

	@keyframes flicker {
		0%,
		100% {
			filter: hue-rotate(var(--hueRotateMaxAngle));
		}
		50% {
			filter: hue-rotate(0deg);
		}
	}
</style>
