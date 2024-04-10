import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	kit: {
		adapter: adapter(),

		alias: {
			$routes: 'src/routes',
			$src: 'src',
			'@': './src/*' // thanks pheralb!
		}
	},
	vitePlugin: {
		inspector: true
	},

	preprocess: [vitePreprocess()]
};

export default config;
