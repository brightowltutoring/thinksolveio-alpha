// TODO: links useful for testing modal in '/plans' in relation to completed stripe session

// http://localhost:4173/stripe?answer_2=0.3hr&invitee_full_name=jew&invitee_email=jonag@pm.me&event_type_name=classico&answer_1=joe@blow.com&answer_3=true

import { redirect } from '@sveltejs/kit';
import { getStripeSessionData } from './getStripeSessionData';

const redirectValue = 307; // vs 308?

export async function load({ url, cookies }) {
	const { stripeCheckoutUrl, sessionName } = await getStripeSessionData(url);

	if (!stripeCheckoutUrl || !sessionName) {
		redirect(redirectValue, '/');
	}

	/* @migration task: add path argument */ cookies.set('stripeCheckoutUrl', stripeCheckoutUrl);
	/* @migration task: add path argument */ cookies.set('sessionName', sessionName);

	redirect(redirectValue, stripeCheckoutUrl);
}
