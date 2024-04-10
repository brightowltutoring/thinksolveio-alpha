<script context="module" lang="ts">
	let isLoggedIn = $state(false);

	export const getIsLoggedIn = () => isLoggedIn;
	export const setIsLoggedIn = (v: boolean) => (isLoggedIn = v);

	export const login = () => setIsLoggedIn(true);
	export const logout = () => setIsLoggedIn(false);
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { modals } from '@/components/root/Navbar.svelte'; //'@/shared/modalsStore.svelte';
	import { cookeh } from '@/utils/utils';
	import { onDestroy, onMount } from 'svelte';
	import { elasticOut, quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	import { logoutFunction } from './logoutFunction';
	import { GoogleLoginButton, MagicLinkSection, PhoneAuthSection } from './index';
	// import GoogleLoginButton from './GoogleLoginButton.svelte';
	// import PhoneAuthSection from './PhoneAuthSection.svelte';
	// import MagicLinkSection from './MagicLinkSection.svelte';

	onMount(async () => await onMountFirebase());
	onDestroy(() => clearInterval(redirectSetInterval));

	let userRedirectUrl = $state('/plans');
	let loggedInEmail: string | null = $state('');
	let loggedInDisplayName: string | null = $state('');
	let loginWelcomeText = $state('');

	// let isUser = $derived(loggedInEmail ?? loggedInDisplayName);

	let redirectSetInterval: ReturnType<typeof setInterval>;

	// let { data } = $derived($page);
	let { data } = $page;
	let seconds = $state(3);
	$effect(() => {
		loginWelcomeText = `Hey ${loggedInDisplayName || loggedInEmail}`;

		if (seconds === 0) {
			modals.closeAll();
			clearInterval(redirectSetInterval);
			goto(userRedirectUrl);
		}

		if (!modals.login && $page.route.id !== '/login') {
			clearInterval(redirectSetInterval);
		}
	});

	function redirectLogic(USER_REDIRECT_URL = '/login') {
		redirectSetInterval = setInterval(() => {
			if (seconds > 0) seconds += -1;

			if (seconds === 0) {
				userRedirectUrl = USER_REDIRECT_URL;
				clearInterval(redirectSetInterval);
			}
		}, 1000);
	}

	async function loginModalOpenRedirect(userEmail: string | null) {
		let redirectUrlFromCookies = cookeh.get('redirectUrlFromCookies');

		if (redirectUrlFromCookies) {
			redirectLogic(redirectUrlFromCookies);
		} else {
			console.log('getdocs from firestore');
			const [{ app }, { getFirestore, collection, getDocs }] = await Promise.all([
				import('$lib/firebase'),
				import('firebase/firestore/lite')
			]);

			// 'email' refers to a custom database
			const querySnapshotDocs = (await getDocs(collection(getFirestore(app), 'email'))).docs;
			let redirectUrlFromFireBase;
			for (const doc of querySnapshotDocs) {
				if (userEmail === doc.id) {
					redirectUrlFromFireBase = doc.data().redirectUrl;
					// redirectUrlFromCookies = doc.data().redirectUrl;

					break;
				}
			}

			if (redirectUrlFromFireBase) {
				// cookeh.set('redirectUrlFromCookies', redirectUrlFromCookies);
				cookeh.set('redirectUrlFromCookies', redirectUrlFromFireBase);

				// redirectLogic(redirectUrlFromCookies);
				redirectLogic(redirectUrlFromFireBase);
			} else {
				let defaultRoute = data.isPWA ? '/pwa' : '/';

				cookeh.set('redirectUrlFromCookies', defaultRoute);

				redirectLogic(defaultRoute);
			}
		}
	}

	async function onMountFirebase() {
		const [{ auth }, { isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged }] =
			await Promise.all([import('$lib/firebase'), import('firebase/auth')]);

		// Confirm the link is a sign-in with email link.

		if (isSignInWithEmailLink(auth, window.location.href)) {
			let email = window.localStorage.getItem('emailForSignIn');
			if (!email) {
				email = window.prompt('Please provide your email for confirmation');
				return;
			}

			signInWithEmailLink(auth, email, window.location.href)
				.then(() => {
					window.localStorage.removeItem('emailForSignIn');

					modals.open('login');
				})
				.catch((error) => console.log('signInWithEmailLink:', error));
		}

		onAuthStateChanged(auth, (user) => {
			if (user) {
				loggedInDisplayName = user.displayName;
				loggedInEmail = user.email;

				login();

				loginModalOpenRedirect(loggedInEmail);

				cookeh.set('haventLoggedOut', Boolean(user));
			} else {
				logout();

				// unsure if leaving here or in 'handleLogout'

				loggedInEmail = '';
			}
		});
	}

	function handleLogout() {
		clearInterval(redirectSetInterval); // this not working on  '/login'

		logout();
		logoutFunction();
	}
</script>

{#if !isLoggedIn}
	<login-card in:slide|global={{ duration: 400, easing: quintOut }}>
		<GoogleLoginButton />

		<p class="py-3" />
		<div class="hidden pwa:block">
			<PhoneAuthSection />
		</div>
		<div class="pwa:hidden">
			<MagicLinkSection />

			<p class="py-3" />
			<PhoneAuthSection />
		</div>
	</login-card>
{:else}
	<logout-card in:slide|global={{ duration: 1000, easing: elasticOut }}>
		<p>{loginWelcomeText}</p>

		Redirecting in
		<p class="p-5 text-5xl">{seconds}</p>

		<form method="POST" use:enhance={handleLogout}>
			<button
				formaction={'/logout'}
				class="rounded-lg bg-rose-300 p-4 text-2xl font-medium text-white duration-200 ease-in hover:scale-110 hover:rounded-xl"
			>
				Logout
			</button>
			<p class="py-3" />
		</form>
	</logout-card>
{/if}

<style lang="postcss">
	/* dark:bg-[#262333] */
	login-card,
	logout-card {
		@apply relative mx-auto block w-[90vw] rounded-2xl bg-[#f2f7fa] px-5 py-10 font-Poppins text-xl shadow-md duration-300 hover:scale-[1.01] hover:rounded-3xl   dark:bg-[#262333] sm:w-[500px] sm:p-10;
		:global(html.dark) & {
			@apply bg-[#262333];
		}
	}
</style>
