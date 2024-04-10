<script lang="ts">
	import { reviews } from './reviews';
	import ReviewCreator from './ReviewCreator.svelte';
	import { mod } from '$src/utils'; // math version of modulo .. javascript version is weird

	// for creating union type ('left'| 'right'); this array is useful in its own right as well
	const toArray = ['left', 'right'] as const;

	const reviewsLength = reviews.length;

	function horizScroll(e: MouseEvent, index: number, to: (typeof toArray)[number]) {
		e.preventDefault();

		let targetIndex = mod(index + (to === 'right' ? 1 : -1), reviewsLength);

		// let targetIndex = index + (to === 'right' ? 1 : -1);
		// if (targetIndex < 0) targetIndex += reviewsLength;
		// targetIndex % reviewsLength;

		document
			.getElementById(`card_${targetIndex}`)
			?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
</script>

<!-- Regular grid-like layout for non-small screens-->
<section class="hidden scale-90 sm:block">
	<div
		class="grid -translate-y-60 grid-cols-1 gap-y-[500px] sm:translate-y-0 md:grid-cols-2 lg:grid-cols-3"
	>
		{#each reviews as { name, title, date, body }}
			<ReviewCreator {title} {name} {date}>
				{body}
			</ReviewCreator>
		{/each}
	</div>
</section>

<!-- Carousel layout for small screens -->
<section
	class="mt-16 block flex overflow-x-scroll scroll-smooth rounded-xl bg-[#f0efef] py-5 scrollbar-hide dark:bg-[#312e44] sm:hidden"
>
	<div class="mx-10 flex gap-x-5 md:mx-20 lg:mx-40">
		{#each reviews as { name, title, date, body }, index}
			<div
				id={`card_${index}`}
				class="relative h-[70vh] w-[85vw] max-w-sm overflow-hidden overflow-y-scroll scroll-smooth rounded-xl bg-white p-5 px-10 shadow-md transition-shadow duration-300 ease-in-out scrollbar-hide hover:shadow-xl dark:bg-[#252333]"
			>
				{#each toArray as to}
					<a
						href={`#card_${mod(index + (to === 'right' ? 1 : -1), reviewsLength)}`}
						onclick={(e) => horizScroll(e, index, to)}
						aria-label="{to} horizontal scroll to next review card"
						class="absolute top-0 z-10 h-full w-16 rounded-full {to == 'left'
							? 'left-0'
							: 'right-0'}"
					/>
				{/each}

				<ReviewCreator {title} {name} {date}>
					{body}
				</ReviewCreator>
			</div>
		{/each}
	</div>
</section>
