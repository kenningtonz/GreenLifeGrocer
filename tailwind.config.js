/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	safelist: [
		"col-span-1",
		"col-span-2",
		"row-span-1",
		"row-span-2",
		"sm:col-span-2",
		"sm:col-span-1",
	],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	theme: {
		fontFamily: {
			body: ["Jaldi", "sans-serif"],
			display: ["	Laila-Regular;", "serif"],
		},

		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			// spacing: {
			// 	o5: "0.5rem",
			// 	1: "1rem",
			// 	2: "2rem",
			// 	3: "3rem",
			// 	4: "4rem",
			// },
			colors: {
				olive: {
					50: "#f9f9ec",
					100: "#eff1d6",
					200: "#e1e5b1",
					DEFAULT: "#ccd385",
					400: "#b4bf5c",
					500: "#98a43e",
					600: "#76822e",
					700: "#5b6427",
					800: "#495024",
					900: "#3f4522",
					950: "#20250e",
				},
				green: {
					50: "#f5faf3",
					100: "#e6f5e3",
					200: "#cee9c9",
					300: "#a6d79e",
					400: "#78bc6c",
					500: "#549f48",
					600: "#418237",
					DEFAULT: "#376a2f",
					800: "#2e5328",
					900: "#003a00",
					950: "#10250e",
				},
				// green: {
				// 	200: "#ccf2b4",
				// 	300: "#CCD385",
				// 	400: "#376a2f",

				// 	30: "#CCD38580",
				// },
				// pink: {
				// 	200: "#f1acac",
				// 	300: "#9a4444",
				// 	500: "#4c3745",
				// },
				pink: {
					50: "#fdf3f3",
					100: "#fbe5e5",
					200: "#f8d0d0",
					DEFAULT: "#f1acac",
					400: "#e88181",
					500: "#db5858",
					600: "#c63c3c",
					700: "#a62f2f",
					800: "#8a2a2a",
					900: "#732929",
					950: "#3e1111",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
