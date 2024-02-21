export const non_home_routes = Object.keys(import.meta.glob('./**/+page.svelte'))
	.filter((el) => {
		return !(el.startsWith('./+page.svelte') || el.includes('slug') || el.includes('old'));
	})
	.map((el) => {
		return el.split('+page.svelte')[0].split('.')[1];
	});
