import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	// STRIPE CHECK .. only ever happens when cancelling an initiated checkout
	const { incomplete_stripe_checkout } = Object.fromEntries(event.url.searchParams);
	if (incomplete_stripe_checkout === 'true') {
		// stripe cookie expires in 10 hours
		/* @migration task: add path argument */
		event.cookies.set('incomplete_stripe_checkout', incomplete_stripe_checkout, {
			path: '/',
			maxAge: 60 * 60 * 10
		});

		redirect(307, event.url.pathname);
		// redirect to same url without search param.
		// NOTE: is this a bad way to implement things, or its ok purely when redirected back (from stripe in this case)
	}

	const response = await resolve(event);
	return response;
}
