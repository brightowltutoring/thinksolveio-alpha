// module.exports = {
// 	plugins: {
// 		// '@tailwindcss/postcss': {}
// 		tailwindcss: {},
// 		autoprefixer: {}
// 	}
// };
// 'tailwindcss/nesting': 'postcss-nested',

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
	plugins: [tailwindcss, autoprefixer]
};

// tw v4 .. nvm config file not supported yet so no 'pwa:'
// export default {
// 	// module.exports = {
// 	plugins: {
// 		'@tailwindcss/postcss': {}
// 	}
// };
