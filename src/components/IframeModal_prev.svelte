<script context="module" lang="ts">
	export type iframeModalType = {
		url: string;
		isOpen: boolean;
		loading: loadStatus;
		name: string;
	};
</script>

<script lang="ts">
	import type { loadStatus } from '@/utils/types';

	// import Modal from '@/components/wrappers/Modal.svelte';
	// import Suspense from '@/components/wrappers/Suspense.svelte';
	import { Modal, Suspense } from '@/components/wrappers';

	let { iframe }: { iframe: iframeModalType } = $props();

	// function load_iframe(node: HTMLIFrameElement) {
	function load_iframe(node: HTMLIFrameElement, iframe: iframeModalType) {
		node.addEventListener('load', iframeLoaded, { once: true });

		return {
			destroy() {
				node.addEventListener('load', iframeLoaded, { once: true });
			}
		};

		function iframeLoaded() {
			iframe.loading = 'success';
			console.log(`woohoo loaded ${iframe.url}`);
		}
	}
</script>

<Modal
	body
	isOpen={iframe.isOpen}
	close={() => (iframe.isOpen = false)}
	class="bg-[rgba(0,0,0,0.1)]"
>
	<Suspense loading={iframe.loading}>
		<iframe class="h-full w-full" use:load_iframe={iframe} src={iframe.url} title={iframe.name} />
		<!-- <iframe class="h-full w-full" use:load_iframe src={iframe.url} title={iframe.name} /> -->
	</Suspense>
</Modal>
