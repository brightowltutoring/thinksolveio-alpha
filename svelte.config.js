import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
// const config = {
export default {
	// extensions: ['.svelte'],
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		alias: {
			'@': './src/*',
			$routes: './src/routes',
			$src: './src'
		}
		//routes: (route) => !route.id?.startsWith('/test')
	},
	vitePlugin: {
		inspector: true
	}
};

// export default config;
