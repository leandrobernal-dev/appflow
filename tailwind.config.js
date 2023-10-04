/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				"text-light": "#1A1947",
				"text-dark": "#f8f7f7",
				"background-light": "#1A1947",
				"background-dark": "#1C171A",
				"primary-background-light": "#fff",
				"secondary-background-light": "#F5F7FF",
				"shadow-light": "rgba(26, 25, 71, 0.15)",
				primary: "#554951",
				"secondary-light": "#98BDFF",
				"secondary-dark": "#141012",
				"accent-light": "#4B49AC",
				"accent-dark": "#C9BFC5",
				"accent-color": "#C9BFC5",
			},
			// colors: {
			// 	"text-light": "#1C171A",
			// 	"text-dark": "#f8f7f7",
			// 	"background-light": "#F8F7F7",
			// 	"background-dark": "#1C171A",
			// 	primary: "#554951",
			// 	"secondary-light": "#E2DADE",
			// 	"secondary-dark": "#141012",
			// 	"accent-light": "#826d7a",
			// 	"accent-dark": "#C9BFC5",
			// 	"accent-color": "#C9BFC5",
			// },
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), "prettier-plugin-tailwindcss"],
	darkMode: "class",
};
