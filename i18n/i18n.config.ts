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

	legacy: false,
	messages: {
		ar: {
			global: require("./lang/global/ar.json"),
			nav: require("./lang/nav/ar.json"),
			home: require("./lang/home/ar.json"),
			auth: require("./lang/auth/ar.json"),
			hotels: require("./lang/hotels/ar.json"),
			contact: require("./lang/contact/ar.json"),
			about: require("./lang/about/ar.json"),
			footer: require("./lang/footer/ar.json"),
			dashboard: require("./lang/dashboard/ar.json"),
			$vuetify: require("./lang/vuetify/ar.json"),
		},
		en: {
			global: require("./lang/global/en.json"),
			nav: require("./lang/nav/en.json"),
			home: require("./lang/home/en.json"),
			hotels: require("./lang/hotels/en.json"),
			auth: require("./lang/auth/en.json"),
			contact: require("./lang/contact/en.json"),
			dashboard: require("./lang/dashboard/en.json"),
			about: require("./lang/about/en.json"),
			footer: require("./lang/footer/en.json"),
			$vuetify: require("./lang/vuetify/en.json"),
		},
	},
}));
