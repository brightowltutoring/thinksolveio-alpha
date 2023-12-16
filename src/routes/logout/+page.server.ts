import { redirect } from '@sveltejs/kit';
export const prerender = false;
export const actions = {
	default: async ({ request, cookies }) => {
		/* @migration task: add path argument */
		// cookies.delete('haventLoggedOut');
		cookies.delete('haventLoggedOut', { path: '/' });

		const refererUrl = request.headers.get('Referer') as string;
		console.log(`refererUrl from logout action: ${refererUrl}`);

		// this will only fire when use:enhance is off and/or js is turned off in browser
		redirect(301, refererUrl);
	}
};
