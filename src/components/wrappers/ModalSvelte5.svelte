<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		isOpen = $bindable(false),
		close = () => {
			isOpen = false;
		},
		body = false,
		class: _class,
		children,
		/** * @param trigger - e.g. use bind:isOpen if isOpen writable */
		trigger
	}: Props = $props();

	type Props = {
		children: Snippet;
		isOpen: boolean;
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
			if (event.target === event.currentTarget || (event as KeyboardEvent).key == 'Escape') {
				close();
			}
		}
	}
</script>

{#if trigger}
	{@render trigger()}
{:else}
	<button onclick={() => (isOpen = true)}> open modal </button>
{/if}

<!-- {#key body ? true : isOpen} -->
{#key body === true || isOpen}
	<modal-container
		use:handleClose
		class="fixed left-0 top-0 hidden h-full w-full items-center justify-center overflow-x-clip overflow-y-scroll text-center {_class} {isOpen &&
			` z-50 !flex`}"
	>
		{@render children()}
		<!-- <slot /> -->
	</modal-container>
{/key}
