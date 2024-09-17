import { setContext, getContext, untrack } from 'svelte';
// function isString(val: any) {
// 	return typeof val === 'string'
// }

export function inview(
	node_or_selector: Element | string,
	args: {
		options?: IntersectionObserverInit,
		once?: boolean,
		enter?: (target: Element) => void,
		leave?: (target: Element) => void,
		deps?: () => boolean | any
	}) {

	let { options, once, enter, leave, deps = () => true } = { ...args }

	$effect(() => {
		let observer = new IntersectionObserver(handler, options)

		const targets: Element[] = typeof node_or_selector === 'string'
			// deps() added to avoid mutation observer in vanilla case
			? deps() && document.querySelectorAll(node_or_selector as string)
			: [node_or_selector as Element];

		targets.forEach((t) => observer.observe(t))

		return () => {
			targets.forEach(t => observer.unobserve(t))
		}
	});



	function handler(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
		for (let e of entries) {
			const target = e.target
			if (e.isIntersecting) {
				if (enter) {
					enter(target)
					once && observer.unobserve(target);
					return
				}
				console.log('default enter')
			}
			else {
				if (leave) {
					leave(target)
					return
				}
				console.log('default leave')
			}

		}
	}
}



export class Ctx<T> {
	#key = Symbol();
	set = (val: T) => setContext(this.#key, val);
	get = () => getContext(this.#key) as T
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
