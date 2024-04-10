// svelte 4 way
import { derived, get, writable } from 'svelte/store';

// export const lastScrollY = writable(0);
export const scrollY = writable(0);

let delayedScrollY = get(scrollY);
let delayedScrollTimeout: NodeJS.Timeout | undefined;
export const instDeltaY = derived(scrollY, ($scrollY) => {
	if (delayedScrollTimeout) clearTimeout(delayedScrollTimeout);

	delayedScrollTimeout = setTimeout(() => (delayedScrollY = $scrollY), 50);
	// inside derived store '$scrollY' is the same as 'get(scrollY)'

	return $scrollY - delayedScrollY;
});

// EXPERIMENTAL: Create a derived store for showHideNav
// export const showHideNav = derived([scrollY, instDeltaY], ([$scrollY, $instDeltaY]) => {
// 	let result = '';

// 	if ($scrollY < 10) {
// 		result = 'bottom-0 backdrop-blur-3xl md:top-0 md:backdrop-blur-none';
// 	}
// 	if ($scrollY > 40 && $instDeltaY > 10) {
// 		result = 'backdrop-blur-3xl duration-200';
// 	}
// 	if ($scrollY > 400 && $instDeltaY > 10) {
// 		result = 'bottom-0 translate-y-20 md:top-0 md:-translate-y-20 backdrop-blur-3xl duration-200';
// 	}
// 	if ($instDeltaY < -100 && $scrollY !== 0) {
// 		result = 'bottom-0 md:top-0 backdrop-blur-3xl duration-500';
// 	}

// 	return result;
// });
