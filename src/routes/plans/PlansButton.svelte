<script lang="ts">
	import type { payButton } from './plansCardStuff';
	import { iframeModals } from '@/components/root';

	let props: { button: payButton; class: string } = $props();

	let thisIndex = $derived(iframeModals.findIndex((el) => el.url === props.button.url));

	function openPlansModal(e: MouseEvent) {
		e.preventDefault();

		iframeModals[thisIndex].isOpen = true;
	}

	function updateIframeModalsOnce(node: HTMLAnchorElement) {
		node.addEventListener('mouseenter', updateIframeModals, { once: true });

		function updateIframeModals() {
			if (thisIndex > -1) return;

			iframeModals.push({
				url: props.button.url,
				isOpen: false,
				loading: 'pending',
				name: props.button.url.split('/thinksolve/')[1].split('?')[0].split('-').join(' ')
			});
		}
	}
</script>

<a
	use:updateIframeModalsOnce
	href={props.button.url}
	onclick={openPlansModal}
	class="{props.button
		.opacityTW} {props.class} m-1 rounded-md p-4 text-xl text-white duration-200 hover:scale-105 hover:rounded-lg hover:shadow-md"
>
	<span>{props.button.text}</span>
</a>
