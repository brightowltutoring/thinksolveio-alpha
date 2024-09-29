<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		isOpen = false,
		close = () => {
			isOpen = false;
		},
		body = false,
		class: _class,
		children,
		trigger
	}: Props = $props();

	type Props = {
		children: Snippet;
		// /** * @param isOpen - e.g. useful message*/
		isOpen?: boolean;
		close?: () => void;
		all?: boolean;
		body?: boolean;
		class?: string;
		trigger?: Snippet;
	};

	function handleClose(node: HTMLElement) {
		document.addEventListener('keydown', _close);
		node.addEventListener('click', _close);

		body && document.body.appendChild(node);

		return {
			destroy() {
				node.removeEventListener('click', _close);
				document.removeEventListener('keydown', _close);
			}
		};
		function _close(event: KeyboardEvent | MouseEvent) {
			if (event.target === event.currentTarget || (event as KeyboardEvent).key === 'Escape') {
				close();
			}
		}
	}
</script>

{#key body === true || isOpen}
	<modal-container
		use:handleClose
		class="fixed left-0 top-0 flex h-full w-full items-center justify-center overflow-x-clip overflow-y-scroll text-center {_class} {isOpen
			? 'z-50 opacity-100 transition-opacity duration-150 '
			: '-z-50 opacity-0'}"
	>
		{@render children()}
		<!-- <slot /> -->
	</modal-container>
{/key}

<!-- NOTE: changed from  <modal-container class="other-classes hidden {isOpen && z-50 !flex`}"> since iframes would delay loading until modal state was true here; i.e. using opacity instead of hidden allows me to preload the iframe while visibily hidden -->
