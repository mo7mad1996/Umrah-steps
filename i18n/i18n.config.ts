export default defineI18nConfig(() => ({
	// modules
	// i18n: {
	// 	locales: [
	// 		{ code: "ar", file: "ar.json", dir: "rtl", name: "العربية" },
	// 		{ code: "en", file: "en.json", dir: "ltr", name: "English" },
	// 	],
	// 	strategy: "no_prefix",
	// 	autoDeclare: true,
	// 	langDir: "lang",
	// 	defaultLocale: "ar",

	legacy: false,
	messages: {
		ar: {
			nav: require("./lang/nav/ar.json"),
		},
		en: {
			nav: require("./lang/nav/en.json"),
		},
	},
}));
