import { redirect, type RequestEvent } from '@sveltejs/kit';
export function isPwaFromCookieOrUrl({ cookies, request: { url } }: RequestEvent) {
	const isPWACookie = cookies.get('isPWA');

	if (isPWACookie === undefined) {
		return { isPWA: url.includes('pwa') };
	}
	return { isPWA: Boolean(isPWACookie) };
}

// // ALTERNATE:
// let isPWA = (isPWACookie === undefined) ? url.includes('pwa'): Boolean(isPWACookie)
// 	return isPWA

// client-side navigator.userAgent results in flash of content
import UAParser from 'ua-parser-js';
export function userAgentFromRequestHeaders(headers: Headers) {
	const userAgent = String(headers.get('user-agent'));
	const parser = new UAParser(userAgent);

	const isMobile = parser.getDevice().type === 'mobile';
	const isIOS = parser.getOS().name?.toLowerCase() === 'ios';
	const browser = parser.getBrowser().name?.toLowerCase();
	const isSafari = browser?.includes('safari');
	// const isIphone = parser.getDevice().model?.toLowerCase() === 'iphone';

	return { isMobile, isIOS, isSafari };
}

// incomplete stripe; TODO: doesn't work??
export function handle_incomplete_stripe(event: RequestEvent) {
	// // STRIPE CHECK .. only ever happens when cancelling an initiated checkout
	const { incomplete_stripe_checkout } = Object.fromEntries(event.url.searchParams);
	if (incomplete_stripe_checkout === 'true') {
		// stripe cookie expires in 10 hours

		event.cookies.set('incomplete_stripe_checkout', incomplete_stripe_checkout, {
			path: '/',
			maxAge: 60 * 60 * 10
		});

		redirect(307, event.url.pathname);
		// redirect to same url without search param.
		// NOTE: is this a bad way to implement things, or its ok purely when redirected back (from stripe in this case)
	}
}
