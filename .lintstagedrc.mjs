export default {
	'**/*.(ts|svelte)': () => 'npm run check',

	'**/*.(ts|js|mjs|cjs|svelte)': (filenames) => [
		`npm run format ${filenames.join(' ')}`,
		`npm run lint ${filenames.join(' ')}`,
	],

	'**/*.(md|json|css)': (filenames) => `npm run format ${filenames.join(' ')}`,
};
