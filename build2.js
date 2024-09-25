import { execSync } from 'child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rename } from 'fs/promises';

const tempFileName = 'page.svelte';
const originalFileName = '+page.svelte';
const baseDir = 'src/routes/';

async function main(dirs) {
	// Step 1: Modify all file paths
	const modifications = dirs.map((dir) => {
		const originalFilePath = path.join(baseDir, dir, originalFileName);
		const tempFilePath = path.join(baseDir, dir, tempFileName);
		return rename(originalFilePath, tempFilePath);
	});

	// Wait for all modifications to complete
	await Promise.all(modifications);

	// Step 2: Run the build command
	execSync('vite build', { stdio: 'inherit' });

	// Step 3: Revert all file paths back to original
	const reverts = dirs.map((dir) => {
		const originalFilePath = path.join(baseDir, dir, originalFileName);
		const tempFilePath = path.join(baseDir, dir, tempFileName);
		return rename(tempFilePath, originalFilePath);
	});

	// Wait for all reverts to complete
	await Promise.all(reverts);
}

// Example usage
const directories = ['pwa'];
//const directories = ['pwa', 'test'];
//const directories = ['pwa', 'test', 'reviews'];
//const directories = ['faq'];
main(directories);
