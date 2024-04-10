<script context="module" lang="ts">
	import { iframeModals } from '@/routes/plans/PlansButton.svelte';

	import type { loadStatus } from '@/utils/types'; // type loadStatus = null | 'pending' | 'success' | 'fail';

	// import Modal from '@/components/wrappers/Modal.svelte';
	// import Suspense from '@/components/wrappers/Suspense.svelte';
	import { Modal, Suspense } from '@/components/wrappers/index';

	export type iframeModalType = {
		url: string;
		isOpen: boolean;
		loading: loadStatus;
		name: string;
	};
	export function load_iframe(node: HTMLIFrameElement, iframe: iframeModalType) {
		node.addEventListener('load', iframeLoaded, { once: true });

		return {
			destroy() {
				node.addEventListener('load', iframeLoaded, { once: true });
			}
		};

		function iframeLoaded() {
			iframe.loading = 'success';
			console.log(`locked & loaded ${iframe.url}`);
		}
	}
</script>

{#each iframeModals as iframe}
	<Modal
		body
		isOpen={iframe.isOpen}
		close={() => (iframe.isOpen = false)}
		class="bg-[rgba(0,0,0,0.1)]"
	>
		<Suspense loading={iframe.loading}>
			<iframe class="h-full w-full" use:load_iframe={iframe} src={iframe.url} title={iframe.name} />
		</Suspense>
	</Modal>
{/each}
