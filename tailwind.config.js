/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
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
			spacing: {
				o5: "0.5rem",
				1: "1rem",
				2: "2rem",
				3: "3rem",
				4: "4rem",
			},
			colors: {
				green: {
					200: "#ccf2b4",
					300: "#CCD385",
					400: "#376a2f",
					500: "#003a00",
					30: "#CCD38580",
				},
				pink: {
					200: "#f1acac",
					300: "#9a4444",
					500: "#4c3745",
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
