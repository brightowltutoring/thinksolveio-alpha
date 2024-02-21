import { writable } from 'svelte/store';

// Old way to mutually handle modals. More manual and readable, but 'clearNavModals' becomes awkward to use ...
export const contactLinkModalOpen = writable(false);
export const navAppModalOpen = writable(false);
export const loginModalOpen = writable(false);
export const homeworkModalOpen = writable(false);

export async function clearNavModals() {
	loginModalOpen.set(false);
	homeworkModalOpen.set(false);
	navAppModalOpen.set(false);
	contactLinkModalOpen.set(false);
}

// New way to mutually handle modals below; 'open' method automatically closes other modals

type Modals = {
	contactLink: boolean;
	navApp: boolean;
	login: boolean;
	homework: boolean;
} & {
	[key: string]: boolean;
};

export const modals = createExclusiveModals({
	homework: false,
	contactLink: false,
	navApp: false,
	login: false
});

// modals.open('contactLink'); // Sets contactLink modal to true and all others to false!
function createExclusiveModals(_modals: Modals) {
	const { subscribe, update } = writable(_modals);

	return { subscribe, open, close, closeAll };

	function open(modalName: string) {
		update((modals) => {
			for (const key in modals) {
				modals[key] = key === modalName;
			}
			return modals;
		});
	}
	function close(modalName: string) {
		update((modals) => {
			// console.log('close');
			modals[modalName] = false;
			return modals;
		});
	}
	function closeAll() {
		update((modals) => {
			// console.log('closeAll');
			for (const key in modals) {
				modals[key] = false;
			}
			return modals;
		});
	}
}

// No intellisense provided ... useless
// type Modals = {
// 	[key in 'contactLink' | 'navApp' | 'login' | 'homework' as string]: boolean;
// };
