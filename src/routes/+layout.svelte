<script lang="ts">
	// import '@unocss/reset/tailwind.css';
	// import 'uno.css';
	import '../app.css';
	import { setIsLoggedIn } from './login/+page.svelte'; // WIP ?
	import { page } from '$app/stores';
	import { isSafari } from '@/shared/clientStore';
	import { TailwindIndicator } from '@/components/';
	import { Footer, Navbar, IframeModals, DebouncedScrollY } from '@/components/root/';
	import { ViewTransition, disableZoomOnTouchDevices, setIsPwaCookie } from '@/utils';
	import { dev } from '$app/environment';

	let { data, children } = $props();

	disableZoomOnTouchDevices();
	setIsPwaCookie();
	ViewTransition();

	isSafari.set(data.isSafari === true);
	setIsLoggedIn(data.haventLoggedOut === 'true'); // seems unneeded?
	// TODO: how do i initialize from haventLoggedOut cookie in login/+page.svelte??
	// let isLoggedIn = $state(data.haventLoggedOut === 'true');
</script>

<svelte:head>
	{@html data.seoString}
	{#if data.isMobile}
		<link rel="manifest" href="/manifest.json" />
	{/if}
</svelte:head>

<!-- <LayoutProvider> -->
<Navbar />
<main class="px-[5%] pt-32">
	{@render children()}
</main>

{#if !['/classroom', '/pwa', '/stripe'].includes($page.route?.id ?? '')}
	<Footer />
{/if}
<!-- </LayoutProvider> -->

<!-- State and/or global views -->
<IframeModals />
<DebouncedScrollY />

<!--TODO: PREVIOUSLY using dev internal to this component, which is 'barrel imported' causes DEV to freeze! -->
{#if dev}
	<TailwindIndicator />
{/if}
