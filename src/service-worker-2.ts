/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
// const CACHE = `cache-${version}`;
const CACHE = `cache-1337`;

const ASSETS = [
	...build, // the app itself
	...files, // everything in `static`
	'/prerendered'
];

sw.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCacheAndSkipWaiting() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
		await sw.skipWaiting();
	}

	event.waitUntil(addFilesToCacheAndSkipWaiting());
});

sw.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

sw.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);

	// ignore POST requests etc
	if (event.request.method !== 'GET') return;
	if (url.pathname.startsWith('/api')) return;

	async function respond() {

		const cache = await caches.open(CACHE);



		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				console.log('hit network 1 ?')
				return response;
			}
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			console.log('hit network 2')
			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				console.log('hit da cache box')
				return response;
			}

			// if there's no cache, then just error out
			// as there is nothing we can do to respond to this request
			//throw err;
			return new Response('Something went very wrong. Try force closing and reloading the app.', {
				status: 408,
				headers: { 'Content-Type': 'text/html' }
			});
		}
	}

	event.respondWith(respond());
});

// We also need to have working push permission registration for this to work, eg
// via: Notification.requestPermission()

sw.addEventListener('push', function (event) {
	try {
		const payload = event.data?.text();

		if (payload) {
			console.log('sending notification', payload);
			event.waitUntil(sw.registration.showNotification('Notification', {
				body: payload,
			}));
		} else {
			console.warn('No payload for push event', event);
		}

	} catch (e) {
		console.warn('Malformed notification', e);
	}
});