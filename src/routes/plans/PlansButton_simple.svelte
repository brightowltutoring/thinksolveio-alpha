<script lang="ts">
	let { button, class: _class } = $props<{
		button: payButton;
		class: string;
	}>();

	import type { payButton } from './plansCardStuff';
	import Modal from '@/components/wrappers/Modal.svelte';
	import StripeCheckout from '$routes/stripe/StripeCheckout.svelte';
	import Suspense from '@/components/wrappers/Suspense.svelte';

	import type { loadStatus } from '@/utils/types';

	let iframe: HTMLIFrameElement;

	let iframeLoading: loadStatus = $state(null);

	let plansModalOpen = $state(false);
	function closePlansModal() {
		plansModalOpen = false;
	}
	function openPlansModal(e: MouseEvent) {
		e.preventDefault();
		plansModalOpen = true;
	}

	function hydrateIframeOnce(node: HTMLAnchorElement) {
		node.addEventListener('mouseenter', hydrateIframe, { once: true });
	}

	// could do onmouseenter={once(hydrateIframe)} an <a/> instead ... imported once wrapper
	function hydrateIframe(e: Event) {
		iframeLoading = 'pending';

		const setIframeLoadingTrue = () => (iframeLoading = 'success');

		iframe?.addEventListener('load', setIframeLoadingTrue, { once: true });
		iframe.src = button.url;
	}
</script>

<!-- {#snippet fallback()}...{/snippet} -->
<Modal body close={closePlansModal} isOpen={plansModalOpen} class={'bg-[rgba(0,0,0,0.1)]'}>
	<Suspense loading={iframeLoading}>
		<StripeCheckout />

		<iframe bind:this={iframe} title="Thinksolve Plans" class="h-full w-full rounded-t-2xl" />
	</Suspense>
</Modal>

<!-- onmouseenter={once(hydrateIframe)}  -->
<a
	href={button.url}
	use:hydrateIframeOnce
	onclick={openPlansModal}
	class="{button.opacityTW} {_class}  m-1 rounded-md p-4 text-xl text-white duration-200 hover:scale-105 hover:rounded-lg hover:shadow-md"
>
	<span>{button.text}</span>
</a>
