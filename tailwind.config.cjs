/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			boxShadow: {
				button: 'rgb(0, 0, 0) 3px 3px 0px 0px'
			},
			maxWidth: {
				'number-input': '5rem'
			},
			translate: {
				'2px': '2px'
			}
		}
	},
	plugins: []
};
