const color = {
	red: 'f34d4e',
	blue: '2aa5d6',
	yellow: 'fea45c'
};

// unfortunately cannot interpolate js variables inside tailwind bg class
const buttonColor = {
	// 1: 'bg-gradient-to-tr from-[#f34d4e] from-[50%] via-red-300 to-[#f34d4e]',
	// 2: 'bg-gradient-to-tr from-indigo-600 from-[40%] via-indigo-400 to-indigo-600'

	1: 'bg-[#AF1433] dark:brightness-200' /* red */,
	2: 'bg-[#353DD9] dark:brightness-200' /* blue */

	// 1: 'bg-[#f34d4e]' /* red */,
	// 2: 'bg-[#2aa5d6]' /* blue */,
	// 3: 'bg-[#fea45c]' /* yellow */
};

export interface payButton {
	resetter: boolean;
	url: string;
	opacityTW: string;
	text: string;
}

export const plansCards = [
	{
		payNowUrl: payUrl('classico', 'stripe', color.red, '&a2=2'),
		payLaterUrl: payUrl('classico', 'invoice', color.red, '&a1=1'),
		buttonColor: buttonColor[1],
		cardTitle: 'Classico',
		cardText:
			'Classic 1-on-1 session with smooth screen-sharing. Digital session notes available as a +1hr premium.'
	},
	{
		// payNowUrl: 'https://cal.com/thinksolveio/classico?layout=week_view',
		payNowUrl: payUrl('mock', 'stripe', color.blue, '&a2=2'),
		payLaterUrl: payUrl('mock', 'invoice', color.blue, '&a1=2'),
		buttonColor: buttonColor[2],
		cardTitle: 'Mock',
		cardText:
			'Get test ready. We provide a live mock test session with answers to completed questions. Digital solution key available as a +2hr premium.'
	}
];

// helper function
function payUrl(
	session_type: string,
	payment_type: string,
	color: string,
	default_form_params: string
) {
	return `https://calendly.com/thinksolve/${session_type}-${payment_type}?embed_domain=thinksolve.io&embed_type=PopupText&hide_gdpr_banner=1&primary_color=${color}${default_form_params}`;
}
