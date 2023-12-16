import { modals } from '$lib/store/modalsStore';
import { cookeh, subscribe$ } from '$lib/utils';
import { page } from '$app/stores';

export async function onMountFirebase() {
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

	let loggedInDisplayName;
	let loggedInEmail;
	onAuthStateChanged(auth, (user) => {
		if (user) {
			loggedInDisplayName = user.displayName;
			loggedInEmail = user.email;

			document.dispatchEvent(new CustomEvent('login'));

			loginModalOpenRedirect(loggedInEmail);

			cookeh.set('haventLoggedOut', Boolean(user));
		} else {
			// document.dispatchEvent(new CustomEvent('logout'));
			// unsure if leaving here or in 'handleLogout'

			loggedInEmail = '';
		}
	});
}

async function loginModalOpenRedirect(userEmail: string | null) {
	let redirectUrlFromCookies = cookeh.get('redirectUrlFromCookies');

	if (redirectUrlFromCookies) {
		// redirectLogic(redirectUrlFromCookies); // nov5 2023 testing; PUT BACK
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
			// redirectLogic(redirectUrlFromFireBase); // nov5 2023 testing; PUT BACK
		} else {
			// let defaultRoute = $page.data.isPWA ? '/pwa' : '/'; // note: original code
			// cookeh.set('redirectUrlFromCookies', defaultRoute);

			// internally handles cleanup
			subscribe$(page, ($) => {
				cookeh.set('redirectUrlFromCookies', $.data.isPWA ? '/pwa' : '/');
			});

			// redirectLogic(defaultRoute); // nov5 2023 testing; PUT BACK
		}
	}
}
