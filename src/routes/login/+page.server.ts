// import { redirect } from '@sveltejs/kit';

// export const actions = {
// 	default: async ({ request, cookies, url }) => {
// 		const isLoggedIn = url.searchParams.get('loggedIn') === 'true';
// 		console.log('isLoggedIn', isLoggedIn);
// 		// cookies.set('haventLoggedOut', 'true');
// 		if (isLoggedIn) cookies.set('haventLoggedOut', String(isLoggedIn));

// 		const refererUrl = request.headers.get('Referer') as string;
// 		console.log(`refererUrl from login action: ${refererUrl}`);

// 		// this will only fire when use:enhance is off and/or js is turned off in browser
// 		// throw redirect(301, refererUrl);
// 	}
// };
