export async function twitterLogin() {
	const [{ auth }, { TwitterAuthProvider, browserPopupRedirectResolver, signInWithPopup }] =
		await Promise.all([import('$lib/firebase'), import('firebase/auth')]);

	const provider = new TwitterAuthProvider();

	signInWithPopup(auth, provider, browserPopupRedirectResolver)
		.then((result) => {
			// This gives you a the Twitter OAuth 1.0 Access Token and Secret.
			// You can use these server side with your app's credentials to access the Twitter API.
			const credential = TwitterAuthProvider.credentialFromResult(result);
			const token = credential!.accessToken;
			const secret = credential!.secret;

			// The signed-in user info.
			const user = result.user;
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = TwitterAuthProvider.credentialFromError(error);
			// ...
		});
	// }
}
