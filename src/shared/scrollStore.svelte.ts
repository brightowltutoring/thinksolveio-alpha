import { debounce } from '@/utils/utils';

class DebouncedScrollY {
	value = $state(0);

	setter = () => {
		this.value = window.scrollY;
		console.log(this.value);
	};

	setterDebounced = debounce(() => this.setter(), 20);

	constructor() {
		if (typeof window == 'undefined') return;
		window.addEventListener('scroll', this.setterDebounced);
	}
}

export const debouncedScrollY = new DebouncedScrollY();
