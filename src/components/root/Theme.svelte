<script context="module" lang="ts">
	let isDarkMode = $state(false);

	export const getIsDarkMode = () => isDarkMode;

	export function toggleDarkMode() {
		setDarkMode(!isDarkMode);
	}

	// STEP 3: Update everything (based on user toggling)
	export function setDarkMode(val: boolean) {
		isDarkMode = val;
		document.documentElement.classList.toggle('dark', val);
		sessionStorage.setItem('isDarkMode', String(val));
		// document.documentElement.classList.toggle('dark', isDarkMode);
		// sessionStorage.setItem('isDarkMode', String(isDarkMode));
	}

	// TODO: WIP ... instantiated in layout.svelte ... because SSR leak with sveltekit
	// export function createTheme() {
	// 	//css initializer

	// 	let _isDarkMode = $state(false);

	// 	const _getIsDarkMode = () => _isDarkMode;

	// 	function _setDarkMode(val: boolean) {
	// 		_isDarkMode = val;
	// 		document.documentElement.classList.toggle('dark', val);
	// 		sessionStorage.setItem('isDarkMode', String(val));
	// 	}
	// 	function _toggleDarkMode() {
	// 		_setDarkMode(!_isDarkMode);
	// 	}

	// 	$inspect(' _isDarkMode', _isDarkMode);

	// 	$effect(() => {
	// 		_isDarkMode = document.documentElement.classList.contains('dark');

	// 		const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
	// 		const setMode = (e: MediaQueryListEvent) => setDarkMode(e.matches);

	// 		matchDark.addEventListener('change', setMode);
	// 		return () => matchDark.removeEventListener('change', setMode);
	// 	});

	// 	return {
	// 		get: _getIsDarkMode,
	// 		toggle: _toggleDarkMode,
	// 		set: _setDarkMode
	// 	};
	// }
</script>

<script>
	// const theme = getContext('theme');
	// const _isDarkMode = $derived(theme.get());
	// const _toggleDarkMode = () => theme.toggle();

	import { getContext, onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { browser } from '$app/environment';

	if (browser) {
		console.log('browser');
	}

	// STEP 2: initialize state from css
	onMount(() => {
		console.log('onMount');
		isDarkMode = document.documentElement.classList.contains('dark');

		const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
		const setMode = (e: MediaQueryListEvent) => setDarkMode(e.matches);

		matchDark.addEventListener('change', setMode);
		return () => matchDark.removeEventListener('change', setMode);
	});
</script>

<svelte:head>
	<script lang="ts">
		// STEP 1: initialize css from browser storage, before dom loaded
		document.documentElement.classList.toggle('dark', initDarkMode());

		function initDarkMode(): boolean {
			console.log('head');
			if (window.location.pathname === '/classroom') return true;

			const match_dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const storage = sessionStorage.getItem('isDarkMode');

			return (!storage && match_dark) || storage === 'true';
		}
	</script>
</svelte:head>

<!-- <button class="fadeIn w-[24px]" onclick={toggleDarkMode}> -->
<button class="fadeIn w-[24px]" onclick={toggleDarkMode}>
	{#key isDarkMode}
		<img
			in:scale={{ duration: 1000, easing: elasticOut }}
			height="24"
			width="24"
			alt={isDarkMode ? 'sun svg' : 'moon svg'}
			src={isDarkMode ? '/sun.svg' : '/moon.svg'}
		/>
	{/key}
</button>

<style>
	.fadeIn {
		animation: fadeIn 0.8s ease;
		transform-origin: center;
	}

	@keyframes fadeIn {
		0% {
			transform: scale(0) rotate(120deg);
		}

		100% {
			transform: scale(1) rotate(0deg);
		}
	}
</style>
