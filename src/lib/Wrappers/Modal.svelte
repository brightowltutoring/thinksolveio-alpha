<!-- svelte5 breaks this? -->
<script lang="ts">
	type Props = {
		onclosemodal?: () => void;
		children?: any;
		modalOpen: boolean;
		bgTW: string;
		transitionsOff?: boolean;
		all?: boolean;
		body?: boolean;
	};

	let {
		onclosemodal = () => {},
		children,
		modalOpen = false,
		bgTW = 'bg-[rgba(0,0,0,0.4)]',
		transitionsOff = false,
		all = false,
		body = false
	} = $props<Props>();

	function closeModal(event: KeyboardEvent | MouseEvent) {
		if (event.currentTarget !== event.target) return;
		// dispatch('closeModal');
		onclosemodal();
	}

	function modalDirective(node: HTMLElement) {
		if (!body && !all) return;

		body && document.body.appendChild(node);
		all && node.addEventListener('click', closeModal);

		return {
			destroy() {
				body && node.remove();
				all && node.removeEventListener('click', closeModal);
			}
		};
	}
</script>

<!-- {#if body || transitionsOff || modalOpen || $isLoggedIn} -->
<!-- {#if body || transitionsOff || modalOpen} -->
{#key body || transitionsOff ? true : modalOpen}
	<div
		role="button"
		tabindex="0"
		onkeypress={closeModal}
		onclick={closeModal}
		use:modalDirective
		class="fixed left-0 top-0 hidden h-full w-full items-center justify-center overflow-x-clip overflow-y-scroll text-center {modalOpen &&
			`${bgTW} z-50 !flex`} 
"
	>
		{@render children()}
		<!-- <slot /> -->
	</div>
{/key}
<!-- {/if} -->

<!-- on:click|self={closeModal} -->
