import { redirect } from '@sveltejs/kit';
import { handle_incomplete_stripe } from './utils/utils.server';

export async function handle({ event, resolve }) {
	// console.log('event.url', event.url);
	handle_incomplete_stripe(event); // conditionally creates cookie and redirects to same url

	// const response = await resolve(event, {
	// 	transformPageChunk: ({ html }) => html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles'),
	// })
	// return response

	// const { incomplete_stripe_checkout } = Object.fromEntries(event.url.searchParams);
	// if (incomplete_stripe_checkout === 'true') {
	// 	// stripe cookie expires in 10 hours
	// 	console.log('incomplete_stripe_checkout ', incomplete_stripe_checkout);

	// 	event.cookies.set('incomplete_stripe_checkout', incomplete_stripe_checkout, {
	// 		path: '/',
	// 		maxAge: 60 * 60 * 10
	// 	});

	// 	redirect(307, event.url.pathname);
	// 	// redirect to same url without search param.
	// 	// NOTE: is this a bad way to implement things, or its ok purely when redirected back (from stripe in this case)
	// }

	const response = await resolve(event);
	return response;
}


