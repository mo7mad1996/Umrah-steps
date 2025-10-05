/** @type {import('tailwindcss').Config} */

export default {
	content: [
		"./components/**/*.{vue,js,ts}",
		"./app/layouts/**/*.vue",
		"./app/global/**/*.vue",
		"./app/pages/**/*.vue",
		"./app/app.vue",
		"./app/plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app/*.vue",
	],

	important: false,

	theme: {
		extend: {
			transitionDuration: {
				DEFAULT: "300ms",
			},
			colors: {
				// base color
				primary: {
					DEFAULT: "#6D8BBE", // Light mode
					dark: "#4B6B9C", // Dark mode
				},
				secondary: {
					// yellow
					DEFAULT: "#F6CF63", // Light mode
					dark: "#EAB308", // Dark mode
				},
				accent: {
					DEFAULT: "#F18E51", // Light mode
					dark: "#D97706", // Dark mode
				},
				background: {
					DEFAULT: "#FDF9F8", // Light mode
					dark: "#111827", // Dark mode
				},
				surface: {
					DEFAULT: "#322E2A", // Light mode (charcoal)
					dark: "#1F2937", // Dark mode (dark gray)
				},
			},
		},
	},
	darkMode: "class",
};
