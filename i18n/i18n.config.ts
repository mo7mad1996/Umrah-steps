export default defineI18nConfig(() => ({
	legacy: false,
	messages: {
		ar: {
			nav: require("./lang/nav/ar.json"),
			home: require("./lang/home/en.json"),
	
		},
		en: {
			nav: require("./lang/nav/en.json"),
      			home: require("./lang/home/en.json"),
		},
	},
}));