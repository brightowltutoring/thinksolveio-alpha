<!-- This gradient-svg idea taken from: https://stackoverflow.com/questions/72212704/is-it-possible-to-fill-an-svg-with-a-gradient-color-or-background-image   TODO: .. for some reason this breaks on chromium browsers -->
<svg width="150" height="150" viewBox="0 0 1024 1024">
	<path
		d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
	/>

	<defs>
		<linearGradient id="GradHere">
			<stop offset="5%" stop-color="#F60" />
			<stop offset="95%" stop-color="#FF6" />
		</linearGradient>
	</defs>
</svg>

<style>
	svg path {
		fill: url(#GradHere);
		animation: animate 4s infinite ease;
	}

	:global(html.dark-mode) svg {
		filter: invert(0.9);
	}

	@keyframes animate {
		50% {
			filter: invert(0.1);
		}
	}
</style>
