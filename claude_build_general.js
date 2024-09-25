import { existsSync, renameSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const excludedFilePaths = [
	'routes/pwa/+page.svelte',
	'routes/test/+page.svelte',
	'utils/sensitive-data.js'
];

async function excludeFiles() {
	await Promise.all(
		excludedFilePaths.map(async (filePath) => {
			const srcPath = join('src', filePath);
			const destPath = join('src', `${filePath.split('/').pop()}.excluded`);

			if (existsSync(srcPath)) {
				await renameSync(srcPath, destPath);
				console.log(`Excluded file: ${filePath}`);
			} else {
				console.log(`Skipping file: ${filePath} (does not exist)`);
			}
		})
	);
}

async function restoreFiles() {
	await Promise.all(
		excludedFilePaths.map(async (filePath) => {
			const srcPath = join('src', `${filePath.split('/').pop()}.excluded`);
			const destPath = join('src', filePath);

			if (existsSync(srcPath)) {
				await renameSync(srcPath, destPath);
				console.log(`Restored file: ${filePath}`);
			} else {
				console.log(`Skipping file: ${filePath} (does not exist)`);
			}
		})
	);
}

async function runBuildCommand() {
	const execPromise = promisify(exec);
	try {
		await execPromise('pnpm run vite:build');
	} catch (error) {
		console.error('Error running the build command:', error);
		throw error;
	}
}

async function main() {
	// Exclude the specified files before the build
	await excludeFiles();

	// Run the build command
	try {
		await runBuildCommand();
	} catch (error) {
		// Handle the build command error
		console.error('Build command failed:', error);
		// Restore the files in case of an error
		await restoreFiles();
		return;
	}

	// Restore the files after a successful build
	await restoreFiles();

	console.log('Build process completed successfully.');
}

main();
