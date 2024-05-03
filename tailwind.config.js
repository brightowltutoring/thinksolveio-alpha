// module.exports = {
export default {
	// darkMode: ['class', ':global(html.dark)'],
	darkMode: ['class', 'html.dark' /*'[data-mode="dark"]'*/],
	content: ['./src/**/*.{html,js,ts,svelte,md,svx}'],
	plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/typography')],
	theme: {
		extend: {
			// colors: {
			// 	'tailwind-blue': '#0ca5e9',
			// 	'uno-green': '#15b8a6's
			// },
			screens: {
				pwa: { raw: '(display-mode: standalone)' },
				notpwa: { raw: 'not all and (display-mode: standalone)' }
			},
			gridTemplateColumns: {
				dynamic: 'repeat(auto-fit, minmax(20rem, 1fr))'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: null
					}
				}
			},
			fontFamily: {
				Nunito: ['Nunito', 'sans-serif'],
				Poppins: ['Poppins', 'sans-serif']
			},
			keyframes: {
				wave: {
					'0%, 100%': {
						transform: 'rotate(-3deg)  translateX(-5px)'
					},
					'50%': {
						transform: 'rotate(3deg)  translateX(5px)'
					}
				},
				bgsize: {
					'0%,100%': {
						backgroundSize: '100% '
					},
					'50%': {
						backgroundSize: '400% '
					}
				}
			},
			animation: {
				wave: 'wave 1s ease infinite',
				bgsize: 'bgsize 4s infinite'
			}
		}
	}
};
