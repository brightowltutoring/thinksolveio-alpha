// bad naming?? check if another state based on this name is coupled
class Boolean {
	value = $state(false);

	// constructor(initial: boolean) {
	// 	this.value = initial;
	// }
}

// export const isLoggedIn = $state({ value: false });
export const isLoggedIn = new Boolean();

// export const contactLinkModalOpen = new Boolean();
// export const navAppModalOpen = new Boolean();
// export const loginModalOpen = new Boolean();
// export const homeworkModalOpen = new Boolean();

import { debounce } from '@/utils/utils';
class DebouncedScrollY {
	value = $state(0);

	setter = () => {
		this.value = window.scrollY;
		console.log(this.value);
	};
	setterDebounced = debounce(() => this.setter(), 200);

	constructor() {
		if (typeof window === 'undefined') return;
		window.addEventListener('scroll', this.setterDebounced);
	}
}

export const debouncedScrollY = new DebouncedScrollY();
