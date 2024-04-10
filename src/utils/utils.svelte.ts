import { setContext, getContext, untrack } from 'svelte';
export class Ctx {
	#key = Symbol();
	get = () => getContext(this.#key);
	set = (val: any) => setContext(this.#key, val);
}

// useful for modals; boolean 'status' not write-able (no setter)
export function exclusive<T extends string>(list: T[]) {
	let current = $state<T | null>(null);
	let modals = {
		open: (key: T) => {
			// console.log(key)
			current = key
		},
		closeAll: () => (current = null)
	};
	for (let key of list) {
		const get = () => current === key;
		Object.defineProperty(modals, key, { get });
	}

	return modals as typeof modals & { [key in T]: boolean };
}

// export function watch$(deps: () => void | void, cb: () => void) {
// 	$effect(() => {
// 		deps();
// 		untrack(cb);
// 	});
// }
