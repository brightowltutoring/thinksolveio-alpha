<script>
	let { data, children } = $props();

	import '../styles.css';
	import { page } from '$app/stores';
	import { isSafari } from '@/shared/clientStore';

	import { disableZoomOnTouchDevices, setIsPwaCookie } from '@/utils/utils';

	import Footer from '@/components/root/Footer.svelte';
	import Navbar from '@/components/root/Navbar.svelte';
	import { setIsLoggedIn } from './login/+page.svelte';

	import IframeModals from '@/components/root/IframeModals.svelte';
	import IframeModal from '@/components/IframeModal.svelte';
	import { iframeModals } from './plans/PlansButton.svelte';
	// import { non_home_routes } from '$routes/routeUtils';
	// console.log(non_home_routes);

	isSafari.set(data.isSafari === true);

	setIsLoggedIn(data.haventLoggedOut === 'true'); // seems unneeded?
	// TODO: how do i initialize from haventLoggedOut cookie in login/+page.svelte??
	// let isLoggedIn = $state(data.haventLoggedOut === 'true');

	disableZoomOnTouchDevices();
	setIsPwaCookie();
</script>

<svelte:head>
	{@html data.seoString}
	{#if data.isMobile}
		<link rel="manifest" href="/manifest.json" />
	{/if}
</svelte:head>

<!-- works but ... cmon 💩-->
<!-- {#each iframeModals as iframe, i}
	<IframeModal bind:iframe={iframeModals[i]} />
{/each} -->

<!-- breaks on deployment 💩-->
<!-- {#each iframeModals as iframe}
	<IframeModal bind:iframe />
{/each} -->

<!-- works now ? -->
{#each iframeModals as iframe}
	<IframeModal {iframe} />
{/each}

<!-- 🎉 just works -->
<!-- <IframeModals /> -->

<main>
	<Navbar />

	<div class="px-[5%] pt-32">
		{@render children()}
	</div>

	{#if !['/classroom', '/pwa', '/stripe'].includes($page.route?.id ?? '')}
		<Footer />
	{/if}
</main>
