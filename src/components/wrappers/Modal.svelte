<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		children,
		isOpen = false,
		close = () => (isOpen = false),
		body = false,
		class: _class
	} = $props<{
		children: Snippet;
		isOpen: boolean;
		close?: () => void;
		all?: boolean;
		body?: boolean;
		class?: string;
	}>();

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
			if (event.target === event.currentTarget || (event as KeyboardEvent).key == 'Escape') {
				close();
			}
		}
	}
</script>

<!-- {#key body ? true : isOpen} -->
{#key body === true || isOpen}
	<modal-container
		use:handleClose
		class="fixed left-0 top-0 hidden h-full w-full items-center justify-center overflow-x-clip overflow-y-scroll text-center {_class} {isOpen &&
			` z-50 !flex`}"
	>
		{@render children()}
	</modal-container>
{/key}
