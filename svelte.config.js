import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
// const config = {
export default {
	extensions: ['.svelte'],
	kit: {
		adapter: adapter(),
		alias: {
			'@': './src/*',
			$routes: './src/routes',
			$src: './src'
		}
	},
	preprocess: [vitePreprocess()]
	// vitePlugin: {
	// 	inspector: true
	// },
};

// export default config;
