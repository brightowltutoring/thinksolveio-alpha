<script lang="ts">
	// import PlansButton from './PlansButton_simple.svelte';
	import PlansButton from './PlansButton.svelte';
	import { scale } from 'svelte/transition';
	import type { payButton } from './plansCardStuff';
	import { elasticOut } from 'svelte/easing';

	let {
		cardText = '',
		cardTitle = '',
		payNowUrl = '',
		payLaterUrl = '',
		buttonColor = '',
		index = 0
	} = $props();

	const payButtons: payButton[] = [
		{
			resetter: false,
			url: payNowUrl,
			opacityTW: 'bg-opacity-100',
			text: 'Pay Now'
		},
		{
			resetter: false,
			url: payLaterUrl,
			opacityTW: 'bg-opacity-80',
			text: 'Pay Later'
		}
	];
</script>

<plans-card
	in:scale|global={{ delay: 100 * index, duration: 1000, easing: elasticOut }}
	class="group block rounded-xl bg-[#f2f7fa] p-5 text-center shadow-md duration-300 hover:scale-105 hover:shadow-lg dark:bg-[#262333] dark:hover:shadow-xl"
>
	<p class="py-5 text-center font-Poppins text-4xl">
		{cardTitle}
	</p>

	{#each payButtons as button}
		<PlansButton
			{button}
			class="{buttonColor} inline-block group-hover:scale-95 group-hover:animate-pulse"
		/>
	{/each}

	<div class="py-4">
		{cardText}
	</div>
</plans-card>
