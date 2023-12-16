<div class="flex h-full w-full backdrop-blur-lg">
	<first-level class="!grid h-full w-full animate-pulse place-content-center overflow-hidden">
		<second-level class="!flex w-full scale-[150%] space-x-5 md:scale-[200%]">
			<third-level class="COMMON_COLOR h-12 w-12 rounded-full" />

			<third-level class="!flex flex-col place-content-center space-y-2">
				<fourth-level class="COMMON_COLOR h-4 w-40 rounded" />
				<fourth-level class="COMMON_COLOR h-4 w-20 rounded" />
			</third-level>
		</second-level>
	</first-level>
</div>

<style>
	fourth-level,
	third-level,
	second-level,
	first-level {
		display: block;
	}

	/* :global(html.dark-mode) .COMMON_COLOR {
		background-color: rgb(255, 255, 255);
	} */
	.COMMON_COLOR {
		/* background-color: rgb(0, 0, 0); */
		/* opacity: 0.7; */

		opacity: 0.5;
		--gradient-from: #f97316;
		--gradient-via: #a855f7;
		--gradient-to: #ec4899;
		background-image: linear-gradient(
			to right,
			var(--gradient-from),
			var(--gradient-via),
			var(--gradient-to)
		);
		background-size: 200% 200%;
		animation: gradient-move 0.8s infinite;
	}

	@keyframes gradient-move {
		0% {
			background-position: left;
		}

		50% {
			background-position: right;
		}

		100% {
			background-position: left;
		}
	}
</style>
