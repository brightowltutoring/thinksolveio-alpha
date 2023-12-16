import { writable } from 'svelte/store';

export type EmailType = string | undefined;
export const emailInputValue$ = writable<EmailType>(undefined);

export function regexEmailChecker(EMAIL: EmailType) {
	if (EMAIL === undefined) return;
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EMAIL);
}

export async function magicLinkToEmail(EMAIL: EmailType) {
	if (EMAIL === undefined || EMAIL === '') return;

	const [{ auth }, { sendSignInLinkToEmail }] = await Promise.all([
		import('$lib/firebase'),
		import('firebase/auth')
	]);

	await sendSignInLinkToEmail(auth, EMAIL, {
		url: 'https://thinksolve.io/',
		handleCodeInApp: true
	})
		.then(() => {
			window.localStorage.setItem('emailForSignIn', EMAIL);
			console.log('success with sendSignInLinkToEmail!');
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('errorCode', errorCode);
			console.log('errorMessage', errorMessage);
		});
}
