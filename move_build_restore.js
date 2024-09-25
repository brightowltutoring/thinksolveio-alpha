import { renameSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';

const currentDir = dirname(fileURLToPath(import.meta.url)); // i.e. '/path/to/src_parent/thisfile.js' --> '/path/to/src_parent/'
const relPathToRoutes = 'src/routes';

const routesDir = join(currentDir, relPathToRoutes);
const tempRoutesDir = join(currentDir, `${relPathToRoutes}_temp`);

// relative routes array normalized to full path array
const excludableRoutes = ['/test', '/pwa', '/stripe/old'].map((r) => join(routesDir, r));

// equivalent to "build":"node exclude.js && vite build && node restore.js" in package.json
await excludeRoutes();
await build();
await restoreRoutes();

async function excludeRoutes() {
	// Exclude the routes by moving them to routes_temp
	for (const route of excludableRoutes) {
		const srcPath = route;
		const destPath = join(tempRoutesDir, srcPath.replace(routesDir, ''));

		// Create the destination directory if it does not exist
		const destDir = dirname(destPath);
		if (!existsSync(destDir)) {
			mkdirSync(destDir, { recursive: true });
		}

		if (existsSync(srcPath)) {
			try {
				renameSync(srcPath, destPath);
				console.log(`Excluded route '${srcPath}' from the build.`);
			} catch (err) {
				console.error(`Error renaming ${srcPath} to ${destPath}:`, err);
			}
		} else {
			console.log(`Source path '${srcPath}' does not exist. Skipping.`);
		}
	}
}

async function restoreRoutes() {
	// Restore the original routes by moving them back to routes
	for (const route of excludableRoutes) {
		const srcPath = join(tempRoutesDir, route.replace(routesDir, ''));
		const destPath = route;

		if (existsSync(srcPath)) {
			try {
				renameSync(srcPath, destPath);
				console.log(`Restored route '${destPath}' after the build.`);
			} catch (err) {
				console.error(`Error renaming ${srcPath} to ${destPath}:`, err);
			}
		} else {
			console.log(`Source path '${srcPath}' does not exist. Skipping.`);
		}
	}

	console.log('Build process completed.');
}
