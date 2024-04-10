<script lang="ts">
	import { getIsDarkMode, setDarkMode } from '@/components/root/Theme.svelte';
	import './ssr_friendly_external_api';
	import EnableJavascript from '@/components/EnableJavascript.svelte';
	import { onMount } from 'svelte';
	import { getOptions } from './JitsiObject';
	import { page } from '$app/stores';

	onMount(() => {
		let initiallyFromLightMode = !getIsDarkMode();
		setDarkMode(true);
		return () => {
			initiallyFromLightMode && setDarkMode(false);
		};
	});

	let { isAdmin = false } = $props();
	let api: any | undefined = $state(undefined);
	let domain = '8x8.vc';
	let options = getOptions(isAdmin);
	let participants: string[] | undefined = $state(undefined);

	onMount(() => {
		options.parentNode = document.querySelector('#meet');

		try {
			//@ts-ignore
			api = new JitsiMeetExternalAPI(domain, options);
			api.addEventListener('participantRoleChanged', (event: any) => {
				const pwd = 'thnkslv';
				if (event.role === 'moderator') {
					api.executeCommand('password', pwd);
					api.executeCommand('toggleLobby', true);
				}

				participants = [...api.getParticipantsInfo()];
			});
			return () => {
				api.dispose();
				console.log('jitsi disposed 🫡');
			};
		} catch (error) {
			console.log('JitsiMeetExternalAPI error:', error);
		}
	});
</script>

<!-- This breaks when SSR set to false in +page.ts ..required since I get 'self' compilation error otherwise when importing jitsi_external_api.js  -->
<EnableJavascript />

<div id="meet" class=" {api && '!opacity-100'}">
	<a
		href={$page.data.isPWA ? '/pwa' : '/'}
		class="opacity-0 transition-opacity duration-1000 {participants && 'opacity-100'}"
	>
		<img alt="hangup button" />
	</a>
</div>

<!-- <svelte:head>
	<script
		src="https://8x8.vc/vpaas-magic-cookie-0c93f8c4b4d6403cbf9746e035d5660e/external_api.js"
	></script>
</svelte:head> -->

<style lang="postcss">
	#meet {
		@apply relative h-[90vh] w-full -translate-y-36 opacity-0 transition-opacity delay-1000 duration-1000 md:h-[670px] md:-translate-y-10;

		@apply pwa:h-[85vh];
	}
	img[alt='hangup button'] {
		@apply absolute right-0 top-10 w-[50px] rotate-90 rounded-full bg-[#2a1c44] p-2 transition-transform duration-300 content-[url('/phone.svg')] hover:rotate-0 hover:scale-[1.3] active:bg-red-900 md:bottom-5 md:right-10 md:top-auto;
	}
</style>
