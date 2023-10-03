/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
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
		extend: {},
	},
	plugins: ["prettier-plugin-tailwindcss", require("flowbite/plugin")],
	darkMode: "class",
};
