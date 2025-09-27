export default defineI18nConfig(() => ({
	legacy: false,
	messages: {
		ar: {
			...require("./lang/ar.json"),
			nav: require("./lang/nav/ar.json"),
		},
		en: {
			...require("./lang/en.json"),
			nav: require("./lang/nav/en.json"),
		},
	},
}));