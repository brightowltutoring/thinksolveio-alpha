import { execSync } from 'child_process';
import readline from 'readline';
import { rimrafSync } from 'rimraf'; // We use rimrafSync for sequential execution

const removeRoute = 'src/routes/test';

if (process.env.CI) {
	rimrafSync(removeRoute);
	execSync('vite build', { stdio: 'inherit' });
} else {
	console.warn('\x1b[33m⚠️  You attempted to run the production build locally.\x1b[0m');
	console.warn(`Only in the production environment will this run and remove: ${removeRoute}.`);
	console.warn(`Run the regular build command.`);


}
