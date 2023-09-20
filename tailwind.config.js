/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            "text-light": "#1C171A",
            "text-dark": "#f8f7f7",
            "background-light": "#F8F7F7",
            "background-dark": "#1C171A",
            primary: "#554951",
            "secondary-light": "#E2DADE",
            "secondary-dark": "#141012",
            "accent-light": "#826d7a",
            "accent-dark": "#C9BFC5",
            "accent-color": "#C9BFC5",
        },
        extend: {},
    },
    plugins: ['prettier-plugin-tailwindcss'],
    darkMode: "class",
};
