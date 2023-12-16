export const modals = exclusive(['homework', 'contactLink', 'navApp', 'login']);

function exclusive<T extends string>(list: T[]) {
	let current = $state<T | null>(null);
	let modals = {
		open: (key: T) => (current = key),
		closeAll: () => (current = null)
	};
	for (let key of list) {
		const get = () => current === key;
		Object.defineProperty(modals, key, { get });
	}

	return modals as typeof modals & { [key in T]: boolean };
}
// // OLD CODE
// Object.defineProperty(modals, key, {
// 	enumerable: true,
// 	get: () => current === key,
// 	set: (value) => {
// 		if (value) current = key;
// 		else if (current === key) current = null;
// 	}
// });
// // OLD CODE

// class CreateExclusive {
// 	modals = $state();

// 	constructor(_modals: T) {
// 		this.modals = _modals;
// 		for (const key in _modals) {
// 			Object.defineProperty(this, key, {
// 				enumerable: true,
// 				get: () => this.modals[key],
// 				set: (value: boolean) => {
// 					this.modals[key] = value;
// 				}
// 			});
// 		}
// 	}

// 	open(modalName: string) {
// 		for (const key in this.modals) {
// 			this.modals[key] = key === modalName;
// 		}
// 	}
// 	close(modalName: string) {
// 		this.modals[modalName] = false;
// 	}
// 	closeAll() {
// 		for (const key in this.modals) {
// 			this.modals[key] = false;
// 		}
// 	}
// }

// export const modals2 = new CreateExclusive({
// 	homework: false,
// 	contactLink: false,
// 	navApp: false,
// 	login: false
// });
