<script lang="ts">
	let { button, ...props$$ } = $props<{
		button: payButton;
		class: string;
	}>();

	import type { payButton } from './plansCardStuff';

	import Modal from '$lib/Wrappers/Modal.svelte';
	import Loading from '$lib/Loading.svelte';
	import StripeCheckout from '$routes/stripe/StripeCheckout.svelte';
	import { onMount } from 'svelte';

	let plansModalOpen = $state(false);
	function closePlansModal() {
		plansModalOpen = false;
	}
	function openPlansModal() {
		plansModalOpen = true;
	}

	let myIframe: HTMLIFrameElement;
	let myIframeSrc: string | undefined = $state(undefined);
	function hydrateIframe() {
		if (myIframeSrc == undefined) {
			myIframeSrc = button.url;
		}
	}

	let iframeLoaded = $state(false);
	function setIframeLoadedTrue() {
		iframeLoaded = true;
		console.log('iframe loaded son');
	}

	onMount(() => {
		myIframe.addEventListener('load', setIframeLoadedTrue);
		return () => {
			myIframe.removeEventListener('load', setIframeLoadedTrue);
		};
	});
</script>

<!-- <Modal body bind:modalOpen bgTW={'bg-[rgba(0,0,0,0.1)]'}> -->

<!-- 'all' attribute previously done -->
<Modal
	all
	body
	onclosemodal={closePlansModal}
	modalOpen={plansModalOpen}
	bgTW={'bg-[rgba(0,0,0,0.1)]'}
>
	{#if !iframeLoaded}
		<Loading />
	{:else}
		<StripeCheckout />
	{/if}

	<iframe
		class="opacity-0 transition-opacity duration-300 ease-in {iframeLoaded &&
			'opacity-100'} fixed bottom-0 h-[90%] w-full rounded-xl border-dotted border-gray-500 backdrop-blur-3xl md:w-[80%] md:-translate-y-5"
		title="Thinksolve Plans"
		src={myIframeSrc}
		bind:this={myIframe}
	/>
</Modal>

<a
	href={button.url}
	on:mouseenter|preventDefault={hydrateIframe}
	on:click|preventDefault={openPlansModal}
	class="{button.opacityTW} {props$$.class}  m-1 rounded-md p-4 text-xl text-white duration-200 hover:scale-105 hover:rounded-lg hover:shadow-md"
>
	<!-- {$$props.class} -->
	<span>{button.text}</span>
</a>
