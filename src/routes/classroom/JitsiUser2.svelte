<!-- Logic in this component (create and load jitsi script in onMount) was needed before I made a 2 line tweak to the local external_api.js >> changed to ssr_friendly_external_api.js -->

<script lang="ts">
	import EnableJavascript from '$lib/EnableJavascript.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { getOptions } from './JitsiObject';
	import { page } from '$app/stores';
	import { isDarkMode } from '$src/lib/store/clientStore';

	let initiallyFromLightMode = !$isDarkMode;
	isDarkMode.set(true);

	onMount(() => {
		document.documentElement.classList.add('dark-mode');

		return () => {
			if (initiallyFromLightMode) {
				isDarkMode.set(false);
				document.documentElement.classList.remove('dark-mode');
			}
		};
	});

	let { isAdmin = false } = $props();
	let options = getOptions(isAdmin);
	let api: any | undefined;
	let domain = '8x8.vc';
	let participants: string[] | undefined = $state(undefined);
	let jitsiScriptLoaded = $state(false);

	onMount(() => {
		options.parentNode = document.querySelector('#meet');

		// Load Jitsi script dynamically
		const jitsiScript = document.createElement('script');
		jitsiScript.src =
			'https://8x8.vc/vpaas-magic-cookie-0c93f8c4b4d6403cbf9746e035d5660e/external_api.js';
		jitsiScript.async = true;
		jitsiScript.onload = () => {
			// @ts-ignore
			api = new JitsiMeetExternalAPI(domain, options);

			api?.addEventListener('participantRoleChanged', function (event: any) {
				const pwd = 'thnkslv';
				if (event.role === 'moderator') {
					api.executeCommand('password', pwd);
					api.executeCommand('toggleLobby', true);
				}

				participants = [...api.getParticipantsInfo()];
			});
		};
		jitsiScript.onerror = (error) => {
			console.error('Error loading Jitsi script', error);
		};

		document.head.appendChild(jitsiScript);
		jitsiScriptLoaded = true;
	});

	onDestroy(() => {
		api?.dispose();
		console.log('jitsi off');
	});
</script>

<EnableJavascript />

<div id="meet" class=" {jitsiScriptLoaded && '!opacity-100'}">
	<a
		href={$page.data.isPWA ? '/pwa' : '/'}
		class="opacity-0 transition-opacity duration-1000 {participants && 'opacity-100'}"
	>
		<img alt="hangup button" />
	</a>
</div>

<style lang="postcss">
	#meet {
		@apply relative h-[90vh] w-full -translate-y-36 opacity-0 transition-opacity delay-1000 duration-1000 md:h-[670px] md:-translate-y-10 pwa:h-[85vh];
	}
	img[alt='hangup button'] {
		@apply absolute right-0 top-10 w-[50px] rotate-90 rounded-full bg-[#2a1c44] p-2 transition-transform duration-300 content-[url('/phone.svg')] hover:rotate-0 hover:scale-[1.3] active:bg-red-900 md:bottom-5 md:right-10 md:top-auto;
	}
</style>
