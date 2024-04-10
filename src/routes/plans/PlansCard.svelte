<!-- <script lang="ts" context="module">
	 //TODO:test
	import type { iframeModalType } from '@/components/root/IframeModals.svelte';

	export const iframeModals: iframeModalType[] = $state([]);
</script> -->

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

	//TODO:test
	// function openPlansModal(e: MouseEvent, thisIndex: number) {
	// 	e.preventDefault();

	// 	iframeModals[thisIndex].isOpen = true;
	// }

	// function updateIframeModalsOnce(
	// 	node: HTMLAnchorElement,
	// 	args: { button: payButton; thisIndex: number }
	// ) {
	// 	let { button, thisIndex } = { ...args };
	// 	node.addEventListener('mouseenter', updateIframeModals, { once: true });

	// 	function updateIframeModals() {
	// 		if (thisIndex > -1) return;

	// 		iframeModals.push({
	// 			url: button.url,
	// 			isOpen: false,
	// 			loading: 'pending',
	// 			name: button.url.split('/thinksolve/')[1].split('?')[0].split('-').join(' ')
	// 		});
	// 	}
	// }
</script>

<plans-card
	in:scale|global={{ delay: 100 * index, duration: 1000, easing: elasticOut }}
	class="group block rounded-xl bg-[#f2f7fa] p-5 text-center shadow-md duration-300 hover:scale-105 hover:shadow-lg dark:bg-[#262333] dark:hover:shadow-xl"
>
	<p class="py-5 text-center font-Poppins text-4xl">
		{cardTitle}
	</p>

	{#each payButtons as button, i}
		<PlansButton
			{button}
			class="{buttonColor} inline-block group-hover:scale-95 group-hover:animate-pulse"
		/>
		<!-- <a
			use:updateIframeModalsOnce={{ button, thisIndex: i }}
			href={button.url}
			onclick={(e) => openPlansModal(e, i)}
			class="{buttonColor} inline-block group-hover:scale-95 group-hover:animate-pulse {button.opacityTW}  m-1 rounded-md p-4 text-xl text-white duration-200 hover:scale-105 hover:rounded-lg hover:shadow-md"
		>
			<span>{button.text}</span>
		</a> -->
	{/each}

	<div class="py-4">
		{cardText}
	</div>
</plans-card>
