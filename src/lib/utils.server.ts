import type { RequestEvent } from '@sveltejs/kit';
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
