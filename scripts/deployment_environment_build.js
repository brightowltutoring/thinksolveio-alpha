import { execSync } from 'child_process';
import readline from 'readline';
import { rimrafSync } from 'rimraf';
import path from 'path';
import fs from 'fs';

// Array of paths to remove (can be directories or files)
const removables = [
    'src/routes/test', 
    'src/routes/pwa',
    'src/routes/stripe/old'
] 


if (process.env.DEPLOYMENT_ENVIRONMENT === 'true') {

     removables.forEach(item => {
        const fullPath = path.resolve(item);
        if (fs.existsSync(fullPath)) {
            console.log(`Removing: ${fullPath}`);
            rimrafSync(fullPath);
        } else {
            console.warn(`Warning: ${fullPath} does not exist.`);
        }
    });
	
    execSync('vite build', { stdio: 'inherit' });
} else {
    console.warn('\x1b[33m⚠️  You attempted to run the production build locally.\x1b[0m');
    console.warn(`Only in the production environment will this run and remove:`);
    removables.forEach(route => console.warn(`  - ${route}`));
    console.warn(`Run the regular build command.`);
}
