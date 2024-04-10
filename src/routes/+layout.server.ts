import { getSeoString } from '@/shared/routesStore.svelte.ts';
import { isPwaFromCookieOrUrl, userAgentFromRequestHeaders } from '@/utils/utils.server';

export async function load(event) {
	const url = event.request.url;
	const haventLoggedOut = event.cookies.get('haventLoggedOut');

	const { seoString } = getSeoString(event.url);
	// could've done this with $page.url in layout.svelte  .. but meh

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
