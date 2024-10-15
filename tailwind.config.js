import daisy from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,css,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [daisy, typography],
	daisyui: {
		themes: ['emerald']
	}
};
