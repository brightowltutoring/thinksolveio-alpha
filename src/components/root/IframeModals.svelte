<script context="module" lang="ts">
	// import { iframeModals } from '@/routes/plans/PlansCard.svelte';  //TODO:test
	import { iframeModals } from '@/routes/plans/PlansButton.svelte';

	import type { loadStatus } from '@/utils/types'; // type loadStatus = null | 'pending' | 'success' | 'fail';

	// import Modal from '@/components/wrappers/Modal.svelte';
	// import Suspense from '@/components/wrappers/Suspense.svelte';
	import { Modal, Suspense } from '@/components/wrappers';

	export type iframeModalType = {
		url: string;
		isOpen: boolean;
		loading: loadStatus;
		name: string;
	};

	function iframeLoaded(iframe: iframeModalType) {
		// setTimeout(() => {
		iframe.loading = 'success';
		console.log(`locked & loaded ${iframe.url}`);
		// }, 3000);
	}
</script>

{#each iframeModals as iframe}
	<Modal
		close={() => (iframe.isOpen = false)}
		isOpen={iframe.isOpen}
		body
		class="bg-[rgba(0,0,0,0.1)]"
	>
		<Suspense loading={iframe.loading}>
			<iframe
				class="h-full w-full"
				onload={() => iframeLoaded(iframe)}
				src={iframe.url}
				title={iframe.name}
			/>
		</Suspense>
	</Modal>
{/each}
