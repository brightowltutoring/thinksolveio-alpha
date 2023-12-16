<script lang="ts">
	import FAQ from '$routes/faq/+page.svelte';
	import Modal from '$lib/Wrappers/Modal.svelte';
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let emailText: HTMLElement;
	let contactLink: HTMLElement;
	let contactLinkModalOpen = $state(false);
	let contactLinkTimeout: ReturnType<typeof setTimeout>;

	onMount(() => document.addEventListener('click', handlecontactLinkModalOpen));

	//This could also be done without 'let contactLink' and with 'e.target.id', but I believe this way scopes everything to this component, whereas the vanilla way could have a id name collision
	function handlecontactLinkModalOpen(e: MouseEvent | TouchEvent) {
		// if (contactLinkTimeout) clearTimeout(contactLinkTimeout);

		if (e.target === contactLink) {
			contactLinkModalOpen = true;
			contactLinkTimeout = setTimeout(() => {
				contactLinkModalOpen = false;
			}, 2000);
		} else if (e.target === emailText) {
			contactLinkModalOpen = true;
			clearTimeout(contactLinkTimeout);
		} else {
			contactLinkModalOpen = false;
			clearTimeout(contactLinkTimeout);
		}
	}

	let faqModalOpen = $state(false);
	function openFaqModal() {
		faqModalOpen = true;
	}
	function closeFaqModal() {
		faqModalOpen = false;
	}
</script>

<!-- pwa:mb-3 -->
<div class="my-20 flex h-10 flex-row items-center justify-center gap-x-1 text-sm">
	<span
		class="background-animate bg-gradient-to-l from-blue-500 to-pink-600 bg-clip-text text-transparent"
	>
		<!-- class="pwa:hidden" -->
		<a href="/faq" on:click|preventDefault={openFaqModal}>faq &nbsp; | &nbsp;</a>
		<span bind:this={contactLink}> contact </span>
	</span>
</div>

<Modal modalOpen={contactLinkModalOpen} bgTW={'backdrop-blur-3xl'}>
	<ul
		in:scale={{ duration: 1500, easing: elasticOut }}
		class="background-animate flex flex-col gap-y-2 bg-gradient-to-r from-teal-700 via-rose-700 to-pink-700 bg-clip-text text-center font-Poppins text-3xl text-transparent dark:from-teal-200 dark:via-rose-300 dark:to-pink-200 sm:text-5xl"
	>
		<li>Email:</li>

		<li class="p-5">
			<a bind:this={emailText} href="mailto:thinksolve.io@gmail.com"> thinksolve.io@gmail.com </a>
		</li>
	</ul>
</Modal>

<Modal modalOpen={faqModalOpen} onclosemodal={closeFaqModal} bgTW={'backdrop-blur-3xl'}>
	<FAQ onclosemodal={closeFaqModal} />
	<!-- <FAQ on:closeFaqModal={closeFaqModal} /> -->
</Modal>
