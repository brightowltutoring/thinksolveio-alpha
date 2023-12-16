import type Stripe from 'stripe';

export async function getStripeSessionData(url: URL) {
	const { invitee_email, event_type_name, answer_1, answer_2, answer_3 } = Object.fromEntries(
		url.searchParams
	);

	// TS complains if I return null. Previous TS typing was also failing (and uglier with external definitions)
	if (!event_type_name) {
		// return;
		return {
			stripeCheckoutUrl: undefined as undefined | null | string,
			sessionName: undefined as undefined | null | string
		};
	}

	const { STRIPE_KEY } = await import('$env/static/private');
	const { Stripe } = await import('stripe');

	const stripe = new Stripe(STRIPE_KEY, {
		apiVersion: '2022-11-15'
	});

	const dollar_hourly_rate = 50;
	const dollar_hourly_rate_2dec = Math.round(dollar_hourly_rate).toFixed(2);
	const dollar_minute_rate_2dec = (Math.round(dollar_hourly_rate) / 60).toFixed(2);
	const cents_minute_rate = dollar_hourly_rate * (100 / 60);
	const unit_amount = Math.round(cents_minute_rate); // checkout based on time in minutes

	// answer_2 represents hours; quantity is in minutes
	const quantity = Math.ceil(60 * Number(answer_2?.match(/\d+(\.\d{1,2})?/)![0]));

	const isClassico = event_type_name?.trim().toLowerCase() === 'classico';
	const isMock = event_type_name?.trim().toLowerCase() === 'mock';

	const extraEntry = {
		quantity: undefined as number | undefined,
		price_data: {
			currency: 'usd',
			unit_amount: unit_amount,
			product_data: {
				name: undefined as string | undefined,
				description: undefined as string | undefined
			}
		}
	};

	const sessionParams = {
		customer_email: answer_1 ?? invitee_email,
		payment_method_types: ['card'],
		mode: 'payment',
		success_url: `${url.origin}/`,
		cancel_url: `${url.origin}/?incomplete_stripe_checkout=true`,

		line_items: [
			{
				quantity: quantity as number | undefined,
				price_data: {
					currency: 'usd',
					unit_amount: unit_amount,
					product_data: {
						name: undefined as string | undefined,
						description:
							`All prices calculated using a rate of $${dollar_minute_rate_2dec} per minute (i.e. $${dollar_hourly_rate_2dec} per hour); quantity ("Qty") refers to time in minutes.

						Re-scheduling OR cancellation with refund possible with at least 24 hours notice.
						Cancellation without refund may result if: (1) student arrives late in excess of 15 minutes; (2) homework is not submitted within 12 hours of booking.

						` as string | undefined
					}
				}
			}
		]
	};

	if (isClassico) {
		sessionParams.line_items[0].price_data.product_data.name = 'Classico Session';
	} else if (isMock) {
		let sessionTime = Math.round(sessionParams.line_items[0].quantity as number);
		let testCreationCostInMinutes = 90;

		sessionParams.line_items[0].quantity = testCreationCostInMinutes + sessionTime;
		sessionParams.line_items[0].price_data.product_data.description += `Price includes session time (${sessionTime} minutes) and mock test creation & answers (equivalent to ${testCreationCostInMinutes} minutes). `;
		sessionParams.line_items[0].price_data.product_data.name = 'Mock Test Session';
	}

	if (answer_3) {
		if (isClassico) {
			extraEntry.quantity = 60;
			extraEntry.price_data.product_data = {
				name: 'Digital Session Notes',
				description:
					'Equivalent to 60 minutes of time. Your notes will become available via the login page (login with ONE of the following providers: email, google, or twitter). '
			};
		} else if (isMock) {
			extraEntry.quantity = 120;
			extraEntry.price_data.product_data = {
				name: 'Digital Solution Key',
				description:
					'Equivalent to 120 minutes of time. Your solution key will become available via the login page (login with ONE of the following providers: email, google, or twitter).'
			};
		}
		sessionParams.line_items = [...sessionParams.line_items, extraEntry];
	}

	const session = await stripe.checkout.sessions.create(
		sessionParams as Stripe.Checkout.SessionCreateParams
	);

	return {
		stripeCheckoutUrl: session.url,
		sessionName: sessionParams.line_items[0].price_data.product_data.name
	};
}
