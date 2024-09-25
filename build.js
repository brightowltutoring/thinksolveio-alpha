import { execSync } from 'child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rename } from 'fs/promises';

const tempFileName = 'page.svelte';
const originalFileName = '+page.svelte';
const baseDir = 'src/routes/';

async function main(pathname) {
	const originalFilePath = path.join(baseDir, pathname, originalFileName);
	const tempFilePath = path.join(baseDir, pathname, tempFileName);

	// Rename the file before build
	await rename(originalFilePath, tempFilePath);

	// Run the build command synchronously
	execSync('vite build', { stdio: 'inherit' });

	// Rename the file back after build
	await rename(tempFilePath, originalFilePath);
}

async function runForDirectories(dirs) {
	const promises = dirs.map((dir) => main(dir));
	await Promise.all(promises);
}

// Example usage
const directories = ['pwa', 'test'];
runForDirectories(directories)
	.then(() => {
		console.log('Both routes excluded and built successfully');
	})
	.catch((error) => {
		console.error(`Error in build process: ${error}`);
	});
