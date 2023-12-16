import { getSeoString } from '$src/lib/store/routesStore.svelte.js';
import { isPwaFromCookieOrUrl, userAgentFromRequestHeaders } from '$lib/utils.server';

// export const prerender = true;

export async function load(event) {
	const url = event.request.url;
	const haventLoggedOut = event.cookies.get('haventLoggedOut');

	const { seoString } = getSeoString(event.url);
	const { isIOS, isMobile, isSafari } = userAgentFromRequestHeaders(event.request.headers);
	const { isPWA } = isPwaFromCookieOrUrl(event);

	return {
		isMobile,
		isIOS,
		isSafari,
		isPWA,
		seoString,
		haventLoggedOut,
		url
	};
}
