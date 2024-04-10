import type Stripe from 'stripe';

export async function getStripeSessionData(url: URL) {

	const CURRENCY_STRING = 'USD'

	const { invitee_email, event_type_name, answer_1, answer_2, answer_3, answer_4 } = Object.fromEntries(
		url.searchParams
	);

	// console.log(url.searchParams);

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
		apiVersion: '2023-10-16'
		// apiVersion: '2022-11-15'
	});

	const dollar_hourly_rate = 50;
	const dollar_hourly_rate_2dec = dollar_hourly_rate;
	const dollar_minute_rate_2dec = (dollar_hourly_rate / 60).toFixed(2)


	const cents_minute_rate = dollar_hourly_rate * (100 / 60);
	const unit_amount = Math.round(cents_minute_rate); // checkout based on time in minutes



	// answer_2 represents hours
	const quantity = Math.ceil(Number(answer_2?.match(/\d+(\.\d{1,2})?/)![0]));
	const minutes = Math.ceil(60 * quantity);



	const sessionParams = {
		customer_email: answer_1 ?? invitee_email,
		payment_method_types: ['card'],
		mode: 'payment',
		success_url: `${url.origin}/plans`,
		cancel_url: `${url.origin}/plans`,
		line_items: [
			{
				quantity: minutes as number | undefined,
				price_data: {
					currency: CURRENCY_STRING,
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


	const isClassico = event_type_name?.trim().toLowerCase() === 'classico';
	const isMock = event_type_name?.trim().toLowerCase() === 'mock';

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
			let quantity_classico = 60
			sessionParams.line_items.push(
				createExtraEntry({
					quantity: quantity_classico,
					name: 'Digital Session Notes',
					description: `Equivalent to ${quantity_classico} minutes of time. Your notes will become available via the login page (login with either ONE of: email, google account).`
				})
			);
		}
		if (isMock) {
			let quantity_mock = 120
			sessionParams.line_items.push(
				createExtraEntry({
					quantity: quantity_mock,
					name: 'Digital Session Key',
					description: `Equivalent to ${quantity_mock} minutes of time. Your solution key will become available via the login page (login with either ONE of: email, google account).`
				})
			);
		}

	}

	const supply_material = answer_4?.toLowerCase().startsWith("no") || false
	if (supply_material) {
		let newEntry = createExtraEntry({
			quantity: 30,
			name: 'Supply Session Material',
			description: 'We will supply the session material. The content can be reused in the following session at no extra cost. Equivalent to 30 minutes of time.'
		});
		sessionParams.line_items.push(newEntry);
	}




	const session = await stripe.checkout.sessions.create(
		sessionParams as Stripe.Checkout.SessionCreateParams
	);

	return {
		stripeCheckoutUrl: session.url,
		sessionName: sessionParams.line_items[0].price_data.product_data.name
	};


	function createExtraEntry({ quantity, name, description }: {
		quantity: number,
		name: string,
		description: string
	}) {
		return {
			quantity: quantity,
			price_data: {
				currency: CURRENCY_STRING,
				unit_amount: unit_amount,
				product_data: {
					name: name,
					description: description
				}
			}
		};
	}
}


