import { existsSync, renameSync } from 'fs';
import { join } from 'path';
import { build } from 'vite';

const excludableRoutes = ['/pwa', '/stripe/old/stripe1'];

// Exclude the routes
for (const route of excludableRoutes) {
	const srcPath = join('src', 'routes', route, '+page.svelte');
	const destPath = join('src', 'routes', route, 'page.svelte');

	if (existsSync(srcPath)) {
		renameSync(srcPath, destPath);
		console.log(`Excluded route '/${route}' from the build.`);
	}
}

// Run the build command
console.log('Running the build command...');
await build();

// Restore the original file names
for (const route of excludableRoutes) {
	const srcPath = join('src', 'routes', route, 'page.svelte');
	const destPath = join('src', 'routes', route, '+page.svelte');

	if (existsSync(srcPath)) {
		renameSync(srcPath, destPath);
		console.log(`Restored route '/${route}' after the build.`);
	}
}

console.log('Build process completed.');
