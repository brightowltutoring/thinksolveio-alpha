import { debounce } from '@/utils/utils';

class DebouncedScrollY {
	value = $state(0);

	setter = () => {
		this.value = window.scrollY;
		console.log(this.value);
	};

	setterDebounced = debounce(() => this.setter(), 20);

	// constructor() {
	// 	$effect.root(() => {
	// 		window.addEventListener('scroll', this.setterDebounced);
	// 		return () => window.removeEventListener('scroll', this.setterDebounced);
	// 	})
	// }
	constructor() {
		if (typeof window === 'undefined') return;

		window.addEventListener('scroll', this.setterDebounced);

	}
}

export const debouncedScrollY = undefined
// export const debouncedScrollY = new DebouncedScrollY();
