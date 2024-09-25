import { renameSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname, normalize } from 'path';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function n_join(...args) {
	return normalize(join(...args));
}

const routesDir = n_join(__dirname, 'src', 'routes');
const excludedRoutesDir = n_join(__dirname, 'src', 'routes_exclude');
//const excludableRoutes = ['test', 'pwa'];
const excludableRoutes = ['test', 'pwa', 'stripe/old'];

// Ensure the excludedRoutesDir exists
if (!existsSync(excludedRoutesDir)) {
	mkdirSync(excludedRoutesDir, { recursive: true });
}

// Exclude the routes by moving them to routes_exclude
for (const route of excludableRoutes) {
	const srcPath = normalize(join(routesDir, route));
	const destPath = n_join(excludedRoutesDir, route);

	if (existsSync(srcPath)) {
		renameSync(srcPath, destPath);
		console.log(`Excluded route '/${route}' from the build.`);
	} else {
		console.log(`Source path '${srcPath}' does not exist. Skipping.`);
	}
}

// Build the app
console.log('Running the build command...');
await build();

// Restore the original routes by moving them back to routes
for (const route of excludableRoutes) {
	const srcPath = n_join(excludedRoutesDir, route);
	const destPath = n_join(routesDir, route);

	if (existsSync(srcPath)) {
		renameSync(srcPath, destPath);
		console.log(`Restored route '/${route}' after the build.`);
	} else {
		console.log(`Source path '${srcPath}' does not exist. Skipping.`);
	}
}

console.log('Build process completed.');
