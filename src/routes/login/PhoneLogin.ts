import { writable } from 'svelte/store';

export type phoneType = string | undefined;
export const phoneInputValue$ = writable<phoneType>(undefined);
export const phoneCodeSent$ = writable(false);

export function regexPhoneChecker(PHONE: string) {
	return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(PHONE);
}

export async function generateRecaptchaVerifier(RECAPTCHA_CONTAINER_ID: string) {
	const [{ auth }, { RecaptchaVerifier }] = await Promise.all([
		import('$lib/firebase'),
		import('firebase/auth')
	]);

	// Could also do 'window.recaptchaVerifier = new RecaptchaVerifier ..' and return nothing, however using this function modularly elsewhere it is more readable to return the desired 'verifier' variable as the output of this called function
	const recaptchaVerifier = new RecaptchaVerifier(
		RECAPTCHA_CONTAINER_ID,
		{
			size: 'invisible',
			callback: (response: any) => {}
		},
		auth
	);

	return recaptchaVerifier;
}

export async function sendCodeToPhone(PHONE_NUMBER: string, RECAPTCHA_VERIFIER: any) {
	const [{ auth }, { setPersistence, browserSessionPersistence, signInWithPhoneNumber }] =
		await Promise.all([import('$lib/firebase'), import('firebase/auth')]);

	// dec1,2022: added this unchecked 'setPersistence' wrapper to log user out once the session is closed; for phone authentication this is desirable to discourage multiple people sharing one account

	setPersistence(auth, browserSessionPersistence).then(() => {
		signInWithPhoneNumber(auth, PHONE_NUMBER, RECAPTCHA_VERIFIER)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				// @ts-ignore
				window.confirmationResult = confirmationResult;
				// ...
			})
			.catch((error) => {
				// Error; SMS not sent
				// ...
			});
	}); // setPersistence block
}

// export function verifySMSCode(SMS_CODE, e) {
// let clickOrEnterFired = e.type == "click" || e.key == "Enter";
export function verifySMSCode(e: ClipboardEvent | KeyboardEvent, SMS_CODE: string) {
	if (e instanceof ClipboardEvent || e instanceof KeyboardEvent) {
		let code = SMS_CODE;

		let confirmationResult = (window as any).confirmationResult;

		// sms code is 6 digits-long as of dec1,2022
		// if (clickOrEnterFired && code.length >= 5 && confirmationResult) {
		if (code.length >= 6 && confirmationResult) {
			confirmationResult
				.confirm(code)
				.then((result: any) => {
					// User signed in successfully.
					// const user = result.user;
					// ...
					console.log('result', result);
				})
				.catch((error: any) => {
					// User couldn't sign in (bad verification code?)
					// ...
					console.log('error', error);
				});
		}
	}
}
