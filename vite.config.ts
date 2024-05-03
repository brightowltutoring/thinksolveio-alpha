
// import UnoCSS from 'unocss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
// import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

export default defineConfig({
	define: {
		'import.meta.env.ENV_VERSION': JSON.stringify(pkg.devDependencies.svelte),
		__SVELTE_VERSION__: JSON.stringify(pkg.devDependencies.svelte),
	},
	plugins: [
		// tailwindcss(),
		sveltekit(),
	],

	// server: {
	// 	hmr: false,
	// 	// watch: {
	// 	// 	usePolling: true
	// 	// }

	// }
})

