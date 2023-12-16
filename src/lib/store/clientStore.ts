import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const isSafari = writable(false);
export const isIOS = writable(false);
export const isPWA = writable(false);
export const isDarkMode = writable(false);
// export const isDarkModeTest = browserStore('isDarkModeTest', false);
export const isDarkModeTest = browserStore('isDarkModeTest', undefined);

type StorageType = 'local' | 'session';
type valueType = string | boolean | undefined;
// type valueType = string | boolean | undefined;
declare type Updater<T> = (value: T) => T;

export function browserStore(key: string, value: valueType, type: StorageType = 'session') {
	if (typeof window == 'undefined') return;
	if (value == undefined) return; // just so that i can have this code not set browser storage

	const browserStorage = type === 'session' ? sessionStorage : localStorage;

	const inStorage = browserStorage.getItem(key);

	let saved = '';
	const { subscribe, set, update } = writable(saved); // create the underlying writable store

	if (inStorage) {
		saved = JSON.parse(inStorage);
	} else {
		browserStorage.setItem(key, JSON.stringify(value));
	}

	// subscribe((value: string | boolean) => {
	// 	browserStorage.setItem(key, JSON.stringify(value));
	// });

	return {
		subscribe,
		set: (value: valueType) => {
			browserStorage.setItem(key, JSON.stringify(value)); // save also to local storage as a string
			return set(JSON.stringify(value));
		},
		//@ts-ignore
		update: (callback: Updater<T>) => {
			return update((last) => {
				const value = callback(last);

				browserStorage.setItem(key, JSON.stringify(value));

				return value;
			});
		}
	};
}
