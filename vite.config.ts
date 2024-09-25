// import UnoCSS from 'unocss/vite'
// import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

////const dirsToExclude = ['src/routes/test'];
//// dont think this works specifically for routes subdirectories, i.e sveltekit hooks into vite build process so need to move this logic to svelte.config.js
//const filesToExclude = ['src/routes/someFile.js'];
//
//const pathsToExclude = [
//	//...dirsToExclude.map((dir) => fileURLToPath(new URL(`${dir}/**`, import.meta.url))),
//	...filesToExclude.map((file) => fileURLToPath(new URL(file, import.meta.url)))
//];

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

export default defineConfig({
	define: {
		'import.meta.env.ENV_VERSION': JSON.stringify(pkg.devDependencies.svelte),
		__SVELTE_VERSION__: JSON.stringify(pkg.devDependencies.svelte)
	},
	plugins: [
		// tailwindcss(),
		sveltekit()
	]

	// server: {
	// 	hmr: false,
	// 	// watch: {
	// 	// 	usePolling: true
	// 	// }

	// }
	//resolve: {
	//	alias: {
	//		$lib: path.resolve('./src/lib')
	//	}
	//}

	// this didnt work at least for 'src/routes' subdirectories
	//build: {
	//	rollupOptions: {
	//		external: pathsToExclude
	//	}
	//}
});
