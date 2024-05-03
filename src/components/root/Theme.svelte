<!-- use context provider or keep? -->
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
</script>

<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	// STEP 2: initialize state from css
	onMount(() => {
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
