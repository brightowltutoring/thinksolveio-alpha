<script module lang="ts">
	// store or pass via context?
	export const iframeModals: iframeModalType[] = $state([]);

	import type { loadStatus } from '@/utils/'; // type loadStatus = null | 'pending' | 'success' | 'fail';

	import { Modal, Suspense } from '@/components/wrappers/';

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
			></iframe>
		</Suspense>
	</Modal>
{/each}
