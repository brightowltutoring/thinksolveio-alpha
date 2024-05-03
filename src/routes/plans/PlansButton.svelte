<script lang="ts">
	import type { payButton } from './plansCardStuff';
	import { iframeModals } from '@/components/root';
	let { button, class: _class }: { button: payButton; class: string } = $props();

	let thisIndex = $derived(iframeModals.findIndex((el) => el.url === button.url));

	function openPlansModal(e: MouseEvent) {
		e.preventDefault();

		iframeModals[thisIndex].isOpen = true;
	}

	function updateIframeModalsOnce(node: HTMLAnchorElement) {
		node.addEventListener('mouseenter', updateIframeModals, { once: true });

		function updateIframeModals() {
			if (thisIndex > -1) return;

			iframeModals.push({
				url: button.url,
				isOpen: false,
				loading: 'pending',
				name: button.url.split('/thinksolve/')[1].split('?')[0].split('-').join(' ')
			});
		}
	}
</script>

<a
	use:updateIframeModalsOnce
	href={button.url}
	onclick={openPlansModal}
	class="{button.opacityTW} {_class} m-1 rounded-md p-4 text-xl text-white duration-200 hover:scale-105 hover:rounded-lg hover:shadow-md"
>
	<span>{button.text}</span>
</a>
