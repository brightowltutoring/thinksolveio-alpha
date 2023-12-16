import * as NV from '$env/static/public';

import { initializeApp, getApps, getApp } from 'firebase/app';

import {
	// getAuth ,
	initializeAuth,
	indexedDBLocalPersistence,
	browserLocalPersistence,
	browserSessionPersistence
} from 'firebase/auth';

// import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: NV.PUBLIC_FIREBASE_apiKey,
	authDomain: NV.PUBLIC_FIREBASE_authDomain,
	projectId: NV.PUBLIC_FIREBASE_projectId,
	storageBucket: NV.PUBLIC_FIREBASE_storageBucket,
	messagingSenderId: NV.PUBLIC_FIREBASE_messagingSenderId,
	appId: NV.PUBLIC_FIREBASE_appId
};

// export const app = initializeApp(firebaseConfig);
export const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// TODO: Update dec13, 2022: oer the suggestions on 'https://github.com/firebase/firebase-js-sdk/issues/4946' and 'https://firebase.google.com/docs/auth/web/custom-dependencies' I am swapping 'getAuth' for 'initializeAuth', which allows me to code split the previously implicit 'browserPopupRedirectResolver' ... specifically I can dynamically import 'browserPopupRedirectResolver' and pass as a third argument to 'signinWithPopup' inside the google/twitter login functions in loginFunctions.js
// RESULT: mobile doesnt load 273 kb of unnecessary js, as complained about on pagespeed insights etc
export const auth = initializeAuth(app, {
	persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence]
});

// this is used when website is mounted to persist login state ... maybe import when login clicked instead??

// idea: import getAuth on page load IF visitor as logged in before ... e.g. can set a localstorage variable ("previouslyLoggedIn") inside the logged in logic (not here)
// otherwise: import getAuth only on the first login button click
//  ...this idea is useful for the majority of people who never log in
