// import { modals } from '$lib/store/modalsStore';
import { modals } from '@/components/root/Navbar.svelte'; //'@/shared/modalsStore.svelte';

export async function logoutFunction() {
	const [{ auth }, { signOut }] = await Promise.all([
		import('$lib/firebase'),
		import('firebase/auth')
	]);

	// this now done server-side with formaction for '/logout'
	// cookeh.eat('haventLoggedOut', 'redirectUrlFromCookies');

	console.log('logoutFunction hit');
	// loginModalOpen.set(false);
	// modals.close('login');
	modals.closeAll();

	signOut(auth)
		.then(() => console.log('firebase user logged out'))
		.catch((error) => console.log('firebase logout failed', error));
}
