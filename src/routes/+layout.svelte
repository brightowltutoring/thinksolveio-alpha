<script lang="ts">
	// TODO: WIP ... breaks encapsulation of hHeme.svelte, but 'safer' in SSR context
	// import { createTheme } from '$src/components/root/Theme.svelte';

	// const theme = createTheme();
	// setContext('theme', theme);

	let { data, children } = $props();

	import '../app.css';
	// import '@unocss/reset/tailwind.css';
	// import 'uno.css';

	import { page } from '$app/stores';
	import { isSafari } from '@/shared/clientStore';

	import { ViewTransition, disableZoomOnTouchDevices, setIsPwaCookie } from '@/utils/utils';

	import { setIsLoggedIn } from './login/+page.svelte';

	// import Footer from '@/components/root/Footer.svelte';
	// import Navbar from '@/components/root/Navbar.svelte';
	// import IframeModals from '@/components/root/IframeModals.svelte';
	import { Footer, IframeModals, Navbar } from '@/components/root/index';
	import TailwindIndicator from '$src/components/TailwindIndicator.svelte';
	import { browser, dev } from '$app/environment';
	import { setContext } from 'svelte';

	// import IframeModal from '@/components/IframeModal.svelte';
	// import { iframeModals } from './plans/PlansButton.svelte';
	// import { non_home_routes } from '$routes/routeUtils';
	// console.log(non_home_routes);

	isSafari.set(data.isSafari === true);

	setIsLoggedIn(data.haventLoggedOut === 'true'); // seems unneeded?
	// TODO: how do i initialize from haventLoggedOut cookie in login/+page.svelte??
	// let isLoggedIn = $state(data.haventLoggedOut === 'true');

	disableZoomOnTouchDevices();
	setIsPwaCookie();

	ViewTransition();
</script>

<svelte:head>
	{@html data.seoString}
	{#if data.isMobile}
		<link rel="manifest" href="/manifest.json" />
	{/if}
</svelte:head>

<!-- works now since alpha 64 -->
<!-- {#each iframeModals as iframe}
	<IframeModal {iframe} />
{/each} -->

<!-- 🎉 just works -->
<IframeModals />
<main>
	<Navbar />
	<div class="px-[5%] pt-32">
		{@render children()}
	</div>

	{#if !['/classroom', '/pwa', '/stripe'].includes($page.route?.id ?? '')}
		<Footer />
	{/if}
</main>

{#if dev}
	<TailwindIndicator />
{/if}
