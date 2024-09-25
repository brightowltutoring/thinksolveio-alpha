import { existsSync, renameSync } from 'fs';
import { join, basename } from 'path';
import { build } from 'vite';

const excludableRoutes = ['src/routes/pwa', 'src/routes/stripe/old/stripe1'];

async function excludeRoutes() {
	await Promise.all(
		excludableRoutes.map(async (route) => {
			const dirPath = join(route);
			if (existsSync(dirPath)) {
				await renameSync(dirPath, `${dirPath}-excluded`);
				console.log(`Excluded route '/${basename(route)}' from the build.`);
			} else {
				console.log(`Skipping route '/${basename(route)}' (does not exist)`);
			}
		})
	);
}

async function restoreRoutes() {
	await Promise.all(
		excludableRoutes.map(async (route) => {
			const dirPath = join(route);
			const excludedDirPath = `${dirPath}-excluded`;
			if (existsSync(excludedDirPath)) {
				await renameSync(excludedDirPath, dirPath);
				console.log(`Restored route '/${basename(route)}' after the build.`);
			} else {
				console.log(`Skipping route '/${basename(route)}' (does not exist)`);
			}
		})
	);
}

async function main() {
	// Exclude the specified routes before the build
	await excludeRoutes();

	// Run the build command
	try {
		await build();
	} catch (error) {
		// Handle the build command error
		console.error('Build command failed:', error);
		// Restore the routes in case of an error
		await restoreRoutes();
		return;
	}

	// Restore the routes after a successful build
	await restoreRoutes();

	console.log('Build process completed successfully.');
}

main();
