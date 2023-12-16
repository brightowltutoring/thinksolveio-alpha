<script lang="ts">
	let { data, children } = $props();

	import '../styles.css';
	import { page } from '$app/stores';
	import { isSafari } from '$lib/store/clientStore';

	import { disableZoomOnTouchDevices, receive, setIsPwaCookie } from '$lib/utils';
	import { onMount, setContext } from 'svelte';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';

	// import Navbar from './Navbar_dec_7_2023_old.svelte';

	let seoString = $derived(data.seoString);
	isSafari.set(data.isSafari === true);

	let isLoggedIn = $state(data.haventLoggedOut === 'true');
	setContext('isLoggedIn', () => isLoggedIn);

	let target = new EventTarget();
	setContext('target', target);
	receive(target, {
		login: () => (isLoggedIn = true),
		logout: () => (isLoggedIn = false)
	});

	disableZoomOnTouchDevices();
	setIsPwaCookie();

	// darkmode related
	let isDarkMode = $state(false);
	setContext('isDarkMode', () => isDarkMode);
	setContext('setDarkMode', setDarkMode);

	onMount(() => {
		isDarkMode = document.documentElement.classList.contains('dark-mode');
		// isDarkMode = initDarkMode()

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (e) => setDarkMode(e.matches));
	});

	function toggleDarkMode() {
		setDarkMode(!isDarkMode);
	}

	function setDarkMode(val: boolean) {
		isDarkMode = val;
		document.documentElement.classList.toggle('dark-mode', isDarkMode);
		sessionStorage.setItem('isDarkMode', String(isDarkMode));
	}
</script>

<svelte:head>
	{@html seoString}
	{#if data.isMobile}
		<link rel="manifest" href="/manifest.json" />
	{/if}

	<script lang="ts">
		document.documentElement.classList.toggle('dark-mode', initDarkMode());

		function initDarkMode(): boolean {
			if (window.location.pathname === '/classroom') return true;

			const match_dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const storage = sessionStorage.getItem('isDarkMode');

			return (!storage && match_dark) || storage === 'true';
		}
	</script>
</svelte:head>

<!-- <svelte:window on:contextmenu|preventDefault onlogin={login} onlogout={logout} /> -->

<main>
	<Navbar {isLoggedIn} {isDarkMode} {toggleDarkMode} />
	<div class="px-[5%] pt-32">
		{@render children()}
	</div>

	{#if !['/classroom', '/pwa', '/stripe'].includes($page.route?.id ?? '')}
		<Footer />
	{/if}
</main>
