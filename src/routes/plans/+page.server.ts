// import { redirect } from '@sveltejs/kit';

// export const load = async ({ cookies, url }) => {
// 	let stripeCheckoutUrl = cookies.get('stripeCheckoutUrl');
// 	if (stripeCheckoutUrl) {
// 		return { stripeCheckoutUrl };
// 	}
// 	const { stripeUrlWithoutHash, stripeHash } = Object.fromEntries(url.searchParams);
// 	if (stripeUrlWithoutHash && stripeHash && !stripeCheckoutUrl) {
// 		let stripeCheckoutUrl = stripeUrlWithoutHash + '#' + stripeHash;
// 		cookies.set('stripeUrl', stripeCheckoutUrl, { maxAge: 60 * 60 * 12 });
// 		throw redirect(307, stripeCheckoutUrl);
// 	}
// };

// export const actions = {
// 	deleteSession: async ({ cookies }) => cookies.delete('stripeCheckoutUrl')
// };

// // ABOVE CODE WORKED WHEN REDIRECTED FROM '/stripe/api/+server.ts'

export async function load({ cookies }) {
	return {
		stripeCheckoutUrl: cookies.get('stripeCheckoutUrl'),
		incomplete_stripe_checkout: cookies.get('incomplete_stripe_checkout'),
		sessionName: cookies.get('sessionName')
	};
}
export const actions = {
	deleteSession: async ({ cookies }) => {
		cookies.delete('incomplete_stripe_checkout', { path: '/' });
		cookies.delete('stripeCheckoutUrl', { path: '/' });
		cookies.delete('sessionName', { path: '/' });
	}
};
