/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: {
					50: 'var(--clr-dark-50)',
					100: 'var(--clr-dark-100)',
					200: 'var(--clr-dark-200)',
					300: 'var(--clr-dark-300)',
					400: 'var(--clr-dark-400)',
					500: 'var(--clr-dark-500)',
					600: 'var(--clr-dark-600)',
					700: 'var(--clr-dark-700)',
					800: 'var(--clr-dark-800)',
					900: 'var(--clr-dark-900)',
					950: 'var(--clr-dark-950)'
				},
				light: {
					50: 'var(--clr-light-50)',
					100: 'var(--clr-light-100)',
					200: 'var(--clr-light-200)',
					300: 'var(--clr-light-300)',
					400: 'var(--clr-light-400)',
					500: 'var(--clr-light-500)',
					600: 'var(--clr-light-600)',
					700: 'var(--clr-light-700)',
					800: 'var(--clr-light-800)',
					900: 'var(--clr-light-900)',
					950: 'var(--clr-light-950)'
				},
				accent: {
					50: 'var(--clr-accent-50)',
					100: 'var(--clr-accent-100)',
					200: 'var(--clr-accent-200)',
					300: 'var(--clr-accent-300)',
					400: 'var(--clr-accent-400)',
					500: 'var(--clr-accent-500)',
					600: 'var(--clr-accent-600)',
					700: 'var(--clr-accent-700)',
					800: 'var(--clr-accent-800)',
					900: 'var(--clr-accent-900)',
					950: 'var(--clr-accent-950)'
				}
			}
		}
	},
	plugins: []
};
