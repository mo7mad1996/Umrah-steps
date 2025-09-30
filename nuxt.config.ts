// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: false },

	css: ["~/assets/css/main.css", "vue3-toastify/dist/index.css"],

	components: [{ path: "~/components" }, { path: "~/components/Global", prefix: "Global" }],

	modules: [
		"@nuxt/icon",
		"@nuxt/image",
		"@nuxtjs/tailwindcss",
		"vuetify-nuxt-module",
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"nuxt-tiptap-editor",
		"@nuxtjs/sitemap",
		"@nuxtjs/robots",
	],

	// modules
	i18n: {
		strategy: "no_prefix",

		defaultLocale: "ar",
		detectBrowserLanguage: {
			useCookie: true,
			alwaysRedirect: false,
			fallbackLocale: "ar",
		},

		vueI18n: "~~/i18n/i18n.config.ts",

		locales: [
			{ code: "ar", language: "ar-EG", dir: "rtl", name: "العربية" },
			{ code: "en", language: "en-US", dir: "ltr", name: "English" },
		],
	},

	// application
	app: {
		head: {
			meta: [
				{
					name: "description",
					content: "موقع حجوزات المعتمر يقدم خدمات التوصيل وحجز الفنادق للمعتمرين",
				},
				{
					name: "google-site-verification",
					content: "luNweKGQ9McJMXvwDKrRjTYa1MM3t6NQfqNq7FpMsGI",
				},
				{ name: "theme-color", content: "#42045d", media: "(prefers-color-scheme: dark)" },
				{ name: "theme-color", content: "#865bea", media: "(prefers-color-scheme: light)" },
				// { name: "color-scheme", content: "dark light" },
			],
			link: [
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "",
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
				},
			],
		},
		pageTransition: { name: "page", mode: "out-in" },
	},

	runtimeConfig: {
		baseUrl: process.env.NUXT_API_URL,
		db_uri: process.env.NUXT_DB_URI,

		public: {
			baseUrl: process.env.NUXT_API_URL,
		},
	},

	vite: {
		mode: "development",
		build: { sourcemap: false },
	},

	logLevel: "info",

	vuetify: {
		vuetifyOptions: {
			theme: {
				scope: "global",

				defaultTheme: "system",
			},
		},
	},
});
