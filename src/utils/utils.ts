import { isDarkMode } from '@/shared/clientStore';
import { page } from '$app/stores';
import { getContext, onMount, setContext } from 'svelte';
import { get, type Readable } from 'svelte/store';
// import { browser } from '$app/environment';
export const is_client = typeof window !== 'undefined'; // framework agnostic version of 'browser'


export function createContext<T>(state_creator?: () => T) {
	const key = Symbol();

	const consumer = () => getContext(key) as T

	const provider = state_creator
		? () => setContext(key, state_creator())
		: (v?: T) => setContext(key, v) as T


	// let provider = (v?: T) => setContext(key, v) as T

	// if (state_creator) {
	// 	provider = () => setContext(key, state_creator())
	// }

	return [provider, consumer]
}

//TODO: BROKEN
// function createContextWIP<T>(state_creator: () => T|undefined = ()=>undefined) {
// export function createContext<T>(state_creator?: () => T) {
// 	const key = Symbol();
// 	const consumer = () => getContext(key) as T

// 	const provider = state_creator
// 		? () => setContext(key, state_creator)
// 		: (v: T) => setContext(key, v)

// 	return [() => provider, () => consumer] as [() => T, () => T]
// 	// return [provider, consumer] as [() => T, () => T]
// 	// return [provider, consumer] as (T)[]
// }
//TODO: BROKEN

// export function createContext<T>(state_creator?: T) {
// 	if (state_creator) {
// 		return createContextFn<T>(() => state_creator) as (T)[]
// 	}
// 	else {
// 		return createContextClassic<T>() as (T)[]
// 	}
// }


export function createContextFn<T>(state_creator: () => T) {
	const key = Symbol();

	const consumer = () => getContext(key) as T
	const provider = () => setContext(key, state_creator())

	return [provider, consumer]
}


export function createContextClassic<T>() {
	let key = Symbol();

	const consumer = () => getContext(key) as T
	const provider = (v: T) => setContext(key, v)

	return [provider, consumer]
}



// to be used in the root (i.e. +layout.svelte)
import { onNavigate } from '$app/navigation';
export function ViewTransition() {

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
}


// -6-5-4|-3-2-1|012|345|678
//  0 1 2| 0 1 2|012|012|012
export function mod(a: number, n: number) {
	// extra check: could've just returned this in all cases but in
	// double positive its fewer operations to just return 'a % n'
	// if (a < 0 || n < 0) {
	return ((a % n) + n) % n;
	// }
	// return a % n;
}

// long press helper
let timeoutId: ReturnType<typeof setTimeout>
let intervalId: ReturnType<typeof setTimeout>
export function longpress(node: HTMLElement, { duration = 300,
	down = () => {
		console.log('holdin it down')
	},
	up = () => { console.log('wat up') },
}) {
	let start = 0
	let running = 0


	node.addEventListener('mousedown', handleMouseDown);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown);
		}
	}


	function handleMouseDown(e: Event) {
		e.preventDefault()

		console.log('mousedownnnn');
		start = performance.now()

		timeoutId = setTimeout(down, duration)
		intervalId = setInterval(() => {
			running += 100
			console.log(running);
		}, 100)

		node.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseUp(e: Event) {
		e.preventDefault()
		clearTimeout(timeoutId);
		clearInterval(intervalId);

		running = 0;

		let elapsed = performance.now() - start;

		if (elapsed > duration) {
			up()
		}
		node.removeEventListener('mouseup', handleMouseUp);
	}
}

export function once<T extends (this: any, e: Event) => void>(fn: T) {
	return function (e) {
		fn?.call(this, e);
		fn = null as any;
	} as T;
}

// SECTION on mouse velocity and accel (used by $derived rune)
let prevScrollY = 0;
export function getVelY(scrollY: number) {
	let timeOutVar;
	if (timeOutVar) clearTimeout(timeOutVar);

	timeOutVar = setTimeout(() => {
		prevScrollY = scrollY;
	}, 600);

	const velY = scrollY - prevScrollY;
	// console.log({ prevScrollY, scrollY });
	return velY;
}

const SCROLL_Y_THRESHOLD = 200;
export function showNav(y_coord: number) {
	// initially only take y_coord into consideration
	if (y_coord < SCROLL_Y_THRESHOLD) {
		console.log('first');
		return true;
	}

	// take vel into consideration, below
	let vel_y = getVelY(y_coord);

	if (y_coord > 0 && vel_y < -100) {
		console.log('second');
		return true;
	}
	if (y_coord > SCROLL_Y_THRESHOLD || vel_y > 0) {
		console.log('third', { y_coord }, { vel_y });
		return false;
	}
}

// EXPERIMENTAL
export async function subscribe$<T>(store: Readable<T>, callback: (value: T) => void) {
	const { onDestroy } = await import('svelte');

	const unsubscribe = store.subscribe(callback);

	onDestroy(unsubscribe);
	// onDestroy(() => unsubscribe());
}

// let sleepTimeout: NodeJS.Timeout;
export function sleep(ms: number) {
	// sleepTimeout && clearTimeout(sleepTimeout);

	return new Promise((resolve) => {
		setTimeout(resolve, ms);
		// sleepTimeout = setTimeout(resolve, ms);
	});
}

//  inspired from 'https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript', but made into a 'factory' for easier use. Might add serializer code from npm cookie inside my set method.
export const cookeh = {
	set: function (
		name: string,
		value: string | boolean,

		{ seconds = 60 * 60 * 24, secure = !get(page).data.isSafari } = {}
		// { seconds = 60 * 60 * 24, secure = !get(isSafari) } = {}
	) {
		if (!is_client) return;

		document.cookie = `${name}=${value}; max-age=${seconds}; SameSite=None${secure ? '; Secure' : ''
			}`;
		console.log(`${name} cookie set; secure: ${secure}`);
	},

	get: function (name: string) {
		if (!is_client) return;
		const match = document.cookie.match(`${name}=(.*?)(;|$)`);
		return match ? decodeURIComponent(match[1]) : '';
	},

	eat: function (...names: string[]) {
		if (!is_client) return;
		names.forEach((name) => (document.cookie = `${name}=; max-age=0;`));
	}
};

export async function setIsPwaCookie() {
	if (!is_client) return;

	if (cookeh.get('isPWA')) return;

	const isPWA = window.matchMedia('(display-mode: standalone)').matches;
	isPWA && cookeh.set('isPWA', isPWA);
}

// debounce from https://www.freecodecamp.org/news/javascript-debounce-example/; TODO: why is 'args / func.apply(this, args)' syntax necessary
// export function debouncer(func: any, timeout = 300) {
// 	let timer: ReturnType<typeof setTimeout>;

// 	return (...args) => {
// 		clearTimeout(timer);
// 		timer = setTimeout(() => {
// 			func.apply(this, args);
// 		}, timeout);
// 	};
// }

// TODO: chatgpt properly-typed version:

type FunctionType = (...args: any[]) => void;
export function debounce<f extends FunctionType>(func: f, timeout = 300) {
	let timerId: NodeJS.Timeout;

	return (...args: Parameters<f>) => {
		timerId && clearTimeout(timerId);
		timerId = setTimeout(() => func(...args), timeout);
	};
}

export function disableZoomOnTouchDevices() {
	if (!is_client) return;

	if ('ontouchstart' in window) {
		for (let eventName of ['gesturestart', 'dblclick']) {
			document.addEventListener(eventName, (e) => {
				e.preventDefault();
			});
		}
	}
}

// Need to use JS to disable scrolling on firefox, since firefox does not support the :has() css pseudo-selector —— e.g. body:has(element){ overflow:hidden }, is the elegant css way of disabling scroll (for a given route containing a specific element) ——
export function disableScrollingOnPage(pathname: string) {
	onMount(() => {
		// const originalOverflow = document.body.style.overflow;
		// navigator.userAgent.toLocaleLowerCase().includes('firefox') &&

		if (pathname === '/classroom' || '/pwa') {
			document.body.style.overflow = 'hidden';
		}

		return () => (document.body.style.overflow = 'auto');
		// return () => (document.body.style.overflow = originalOverflow);
	});
}

// USE ACTIONS BELOW:
export function useInView(
	node?: HTMLElement,
	{
		onview = (target: Element) => console.log('i ❤️ slots'),
		once = true,
		vanilla = undefined as string | undefined,
		root = undefined,
		threshold = 0,
		margin = '0px'
	} = {}
) {
	const options = { root, threshold, rootMargin: margin };
	const observer = new IntersectionObserver(handleIntersect, options);

	if (node) observer.observe(node);
	if (!node && vanilla) {
		// if (!is_client) return;
		document.querySelectorAll(vanilla).forEach((el) => observer.observe(el));
		// document.querySelectorAll(`${vanilla}`).forEach((el) => observer.observe(el));
	}

	function handleIntersect(ENTRIES: IntersectionObserverEntry[], OBSERVER: IntersectionObserver) {
		for (const entry of ENTRIES) {
			if (entry.isIntersecting) {
				onview(entry.target);
				once && OBSERVER.unobserve(entry.target);
			}
		}
	}

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

// useful action when wanting to do onclick on a non-button element, and want to avoid a11y complaint. Currently haven't found a nice way to reproduce the svelte event modifiers like '|self'
type EventTypes = Event | KeyboardEvent;
type HandlerType = (event: EventTypes) => void;
export function clickOrKeydown(node: HTMLElement, handler: HandlerType) {
	node.addEventListener('click', handleClickOrKeydown);
	node.addEventListener('keydown', handleClickOrKeydown);

	function handleClickOrKeydown(event: EventTypes) {
		if (event.type === 'keydown' || event.type === 'click') handler(event);
	}

	return {
		destroy() {
			node.removeEventListener('click', handleClickOrKeydown);
			node.removeEventListener('keydown', handleClickOrKeydown);
		}
	};
}

// NOTE: In the vanilla case, I would have to do:
// let inView;

// onMount(() => {
// 	inView = useInView(undefined, {
// 		vanilla: 'IMG'
// 	});

// 	return () => inView.destroy();
// });

// OR do:
// let inView =
// 	browser &&
// 	useInView(undefined, {
// 		vanilla: 'IMG'
// 	});

// onDestroy(() => {
// 	inView && inView.destroy();
// });

export function inDarkOutOriginal() {
	onMount(() => {
		let initiallyInLightmode = !get(isDarkMode);
		document.documentElement.classList.add('dark');
		isDarkMode.set(true);

		return () => {
			if (initiallyInLightmode) {
				isDarkMode.set(false);
				document.documentElement.classList.remove('dark');
			}
		};
	});
}

export function cssToHead(id = 'dropzoneCSS', path = '/dropzone.css') {
	if (!is_client) return;

	if (!document.getElementById(id)) {
		const element = document.createElement('link');
		element.id = id;
		element.href = path;
		element.rel = 'stylesheet';
		document.head.appendChild(element);
	}
}
export function jsToHead(id = 'calendlyJS', path = 'external-website.com/calendly.js') {
	if (!is_client) return;

	if (!document.getElementById(id)) {
		const element = document.createElement('script');
		element.id = id;
		element.src = path;
		element.type = 'text/javascript';
		document.head.appendChild(element);
	}
}

import { PUBLIC_UPLOAD_ENDPOINT } from '$env/static/public';

export async function sendDummyTextFileToGoogleDrive(name: string) {
	const data = new FormData();
	const file = new File([`${name}`], `${name}.txt`, {
		type: 'text/plain'
	});
	data.append('file', file);

	await fetch(PUBLIC_UPLOAD_ENDPOINT, {
		method: 'POST',
		body: data
	});
}



// export function receive(target: EventTarget, event_handler_object: Record<string, () => void>) {
// 	onMount(() => {
// 		const entries = Object.entries(event_handler_object);

// 		for (let [event, handler] of entries) {
// 			target.addEventListener(event, handler);
// 		}

// 		return () => {
// 			for (let [event, handler] of entries) {
// 				target.removeEventListener(event, handler);
// 			}
// 		};
// 	});
// }

// added nov 26, 2023 ... useful for ensuring element exists before chaining a custom even on it
// TODO: does not work, but does in REPL?
// https://svelte-5-preview.vercel.app/#H4sIAAAAAAAAE4VUXW-bMBT9K7esUkBLyfqahkjTuodJ67aHvSWR6sBN49VgZJu0EeW_79qACUmlCoGw7-c5Ptd1sOMCdTBf1UHBcgzmwdeyDKaBOZZ2oQ8oDNJay0qldmehU8VLs1wXa8PzUioDNcjiQVaFgQZ2SuYwacMmI58XxQ3bCjxzmmkj1Zmr3GpUB_ymkBkuCx8RzyrDhXbO9k1loQ24BJD4AuFqE9294_LASvIq8AXoLxxcdlWRujIsy34YzMMIamczLiyuyowZDLWhLyRLWMVx7BZTalWwLYo5TGzgpNlENrC5yJyhQIMuOS8yfP2gQme0ZtqJdSl4im3kFG6j3qrQVKoA59SiMc24AaoKKDzS7phCQthVcUFndIcTweMnZuTN7SSKzR6LEEWy9E1ZSqXAWMgnMkxhwo7H4yQ6baAt17Pf5Vc9-5VxdX5326HCVKpMj5CfFuns3Yn5tCgoBDrj6ssmVpjLA2a_ZIb6_WZ9jtM2-_bi7seBqiHdc5H95NrMwaiKZNtSG_Vktu9iNsxDsdhWhkimcZindGTPb6XCAxbmHnesEiapO4U1bno-2-g2wkXTshKQCqZ1sg5eFCtLVOsAtnTwc7PnOqlRtKH1J2TpHq5b6TMNnLJOgbcHbxaCA8-SmjdduvrRnec17Tw2sKyte-yk24D1-rDxQTEXrD7eO3GDS-61ear4XhrN8sYDXswEb6HMLJTGclGJJd00ucz4jmMWzC3tzdRfTG72h6vpnz69lvDV3R1-4s41ramflNiKBtl342Ml-YeuF66RlKZHk9FLLWVCbFn6THrrK3hVelLanF6NdNadFuOdVN8JZBgWtBwz2T58B84W289fwgdXSQK38PYGV24_Zybdox5gROcpBkTj_Wa8JIRtF-NtPwMZ1wS5oCLhMG9W9n7R3J2z89F89-wNOS5GLpNplZPg3hm8KehqS32jn8OTGSZ0l5LZNP8BmkKvWNcGAAA=
// export function observeCreation(selector) {
// 	return new Promise((res) => {
// 		const callback = (records) => {
// 			records[0].addedNodes.forEach((node) => {
// 				if (node.nodeType === 1 && node.matches(selector)) {
// 					res(node);
// 					observer.disconnect();
// 				}
// 			});
// 		};

// 		const observer = new MutationObserver(callback);
// 		observer.observe(document, { childList: true, subtree: true });
// 	});
// }

// function isCalendlyEvent(e: MessageEvent) {
// 	return e.data.event && e.data.event.indexOf('calendly') === 0;
// }

// onMount(() => {
// 	window.addEventListener('message', (e) => {
// 		if (isCalendlyEvent(e)) {
// 			let payload = e.data;
// 			if (payload) {
// 				alert(JSON.stringify(payload));
// 			}
// 		}
// 	});
// });
