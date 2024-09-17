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
	import { Modal, Suspense } from '@/components/wrappers/';

	let props: { iframe: iframeModalType } = $props();

	function iframeLoaded() {
		// setTimeout(() => {
		props.iframe.loading = 'success';
		console.log(`woohoo loaded ${props.iframe.url}`);
		// }, 3000);
	}
</script>

<Modal
	body
	isOpen={props.iframe.isOpen}
	close={() => (props.iframe.isOpen = false)}
	class="bg-[rgba(0,0,0,0.1)]"
>
	<Suspense loading={props.iframe.loading}>
		<iframe
			class="h-full w-full"
			onload={iframeLoaded}
			src={props.iframe.url}
			title={props.iframe.name}
		></iframe>
	</Suspense>
</Modal>
