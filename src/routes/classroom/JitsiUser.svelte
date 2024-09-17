<script lang="ts">
	import type {
		JitsiMeetExternalAPI as JMType,
		ParticipantJoinedEvent,
		ParticipantRoleChangedEvent
	} from 'jitsi-meet';
	import './ssr_friendly_external_api';
	import { getIsDarkMode, setDarkMode } from '@/components/root/';
	import { getOptions } from './JitsiObject';
	import { page } from '$app/stores';
	import EnableJavascript from '@/components/EnableJavascript.svelte';

	let { isAdmin = false } = $props();
	let api: JMType | null = $state(null);
	let participants: string[] = $state([]);

	function jitsiSession(node: HTMLElement | null) {
		// set darkmode true when entering session
		let initiallyFromLightMode = !getIsDarkMode();
		setDarkMode(true);

		//const domain = 'meet.mayfirst.org';
		const domain = '8x8.vc';
		//const domain = 'meet.jit.si';
		const options = getOptions(isAdmin, node);

		try {
			//@ts-expect-error
			//api?.addListener('participantJoined', (event: ParticipantJoinedEvent) => {
			api = new JitsiMeetExternalAPI(domain, options);
			api?.addEventListener('participantRoleChanged', (event: ParticipantRoleChangedEvent) => {
				if (!api) return;
				alert('hey');

				const pwd = 'thnkslv';
				if (event.role === 'moderator') {
					api.executeCommand('password', pwd);
					api.executeCommand('toggleLobby', true);
				}
				participants = api.getParticipantsInfo();
			});
			return {
				destroy() {
					api?.dispose();
					console.log('🫡 jitsi');
					// return theme state when leaving session
					initiallyFromLightMode && setDarkMode(false);
				}
			};
		} catch (error) {
			console.log('JitsiMeetExternalAPI error:', error);
		}
	}

	import { onMount } from 'svelte';
	onMount(() => {
		let initiallyFromLightMode = !getIsDarkMode();
		setDarkMode(true);
		return () => {
			initiallyFromLightMode && setDarkMode(false);
		};
	});

	//let api: any | undefined = $state(undefined);
	//let domain = '8x8.vc';
	//let options = getOptions(isAdmin);
	//let participants: string[] | undefined = $state(undefined);
	//onMount(() => {
	//	options.parentNode = document.querySelector('#meet');
	//
	//	try {
	//		//@ts-ignore
	//		api = new JitsiMeetExternalAPI(domain, options);
	//		api.addEventListener('participantRoleChanged', (event: any) => {
	//			const pwd = 'thnkslv';
	//			if (event.role === 'moderator') {
	//				api.executeCommand('password', pwd);
	//				api.executeCommand('toggleLobby', true);
	//			}
	//
	//			participants = [...api.getParticipantsInfo()];
	//		});
	//		return () => {
	//			api.dispose();
	//			console.log('jitsi disposed 🫡');
	//		};
	//	} catch (error) {
	//		console.log('JitsiMeetExternalAPI error:', error);
	//	}
	//});
</script>

<!-- This breaks when SSR set to false in +page.ts ..required since I get 'self' compilation error otherwise when importing jitsi_external_api.js  -->
<EnableJavascript />

<div use:jitsiSession id="meet" class={api && '!opacity-100'}>
	<a
		href={$page.data.isPWA ? '/pwa' : '/'}
		class="opacity-0 transition-opacity duration-1000 {participants.length > 0 && 'opacity-100'}"
	>
		<img alt="hangup button" />
	</a>
</div>
<!--<svelte:head>
	<script
		src="https://8x8.vc/vpaas-magic-cookie-7418e57a81e64cc399b2d0620579a5bd/external_api.js"
		async
	></script>
</svelte:head>-->
<!-- <svelte:head>
	<script
		src="https://8x8.vc/vpaas-magic-cookie-0c93f8c4b4d6403cbf9746e035d5660e/external_api.js"
	></script>
</svelte:head> -->

<!--TODO: moved to app.css  .... why? -->
<!-- <style lang="postcss">
	#meet {
		@apply relative h-[90vh] w-full -translate-y-36 opacity-0 transition-opacity delay-1000 duration-1000 md:h-[670px] md:-translate-y-10;

		@apply pwa:h-[85vh];
	}
	img[alt='hangup button'] {
		@apply absolute right-0 top-10 w-[50px] rotate-90 rounded-full bg-[#2a1c44] p-2 transition-transform duration-300 content-[url('/phone.svg')] hover:rotate-0 hover:scale-[1.3] active:bg-red-900 md:bottom-5 md:right-10 md:top-auto;
	}
</style> -->
