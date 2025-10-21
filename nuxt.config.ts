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
		"nuxt-file-storage",
	],

	tiptap: {
		prefix: "Tiptap", //prefix for Tiptap imports, composables not included
	},

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

		bundle: {
			optimizeTranslationDirective: false,
		},

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
					content: "موقع حجوزات معتمر يقدم خدمات التوصيل وحجز الفنادق للمعتمرين",
				},
				{
					name: "google-site-verification",
					content: "luNweKGQ9McJMXvwDKrRjTYa1MM3t6NQfqNq7FpMsGI",
				},
				{ name: "theme-color", content: "#0284C7", media: "(prefers-color-scheme: dark)" },
				{ name: "theme-color", content: "#0EA5E9", media: "(prefers-color-scheme: light)" },
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

	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},

	runtimeConfig: {
		baseUrl: process.env.NUXT_API_URL,
		db_uri: process.env.NUXT_DB_URI,
		mount: process.env.NUXT_MOUNT,

		public: {
			baseUrl: process.env.NUXT_API_URL,
		},
	},

	vite: {
		mode: "development",
		build: { sourcemap: false },
	},
	image: {
		domains: [process.env.BOLB_URL || ""],
		format: ["webp"],
		quality: 70,
		uploadcare: {
			cdnURL: process.env.BOLB_URL,
		},
	},

	fileStorage: {
		mount: process.env.NUXT_MOUNT,
	},

	logLevel: "info",

	vuetify: {
		vuetifyOptions: {
			date: {
				adapter: "vuetify",
			},

			theme: {
				defaultTheme: "system",

				themes: {
					light: {
						colors: {
							primary: "#6D8BBE",
							secondary: "#F6CF63",
							accent: "#F18E51",
							background: "#FDF9F8",
							surface: "#322E2A",
							error: "#DC2626",
							warning: "#FBBF24",
							info: "#2563EB",
							success: "#059669",
						},
					},
					dark: {
						colors: {
							primary: "#4B6B9C",
							secondary: "#EAB308",
							accent: "#D97706",
							background: "#111827",
							surface: "#1F2937",
							error: "#F87171",
							warning: "#FACC15",
							info: "#3B82F6",
							success: "#34D399",
						},
					},
				},
			},
		},
	},
});
