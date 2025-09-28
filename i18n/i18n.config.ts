import navAr from "./lang/nav/ar.json";
import navEn from "./lang/nav/en.json";
import homeAr from "./lang/home/ar.json";
import homeEn from "./lang/home/en.json";
import authAr from "./lang/auth/ar.json";
import authEn from "./lang/auth/en.json";
import hotelsAr from "./lang/hotels/ar.json";
import hotelsEn from "./lang/hotels/en.json";
import contactAr from "./lang/contact/ar.json";
import contactEn from "./lang/contact/en.json";
import aboutAr from "./lang/about/ar.json";
import aboutEn from "./lang/about/en.json";
import footerAr from "./lang/footer/ar.json";
import footerEn from "./lang/footer/en.json";
import dashboardAr from "./lang/dashboard/ar.json";
import dashboardEn from "./lang/dashboard/en.json";
import vuetifyAr from "./lang/vuetify/ar.json";
import vuetifyEn from "./lang/vuetify/en.json";
import globalAr from "./lang/global/ar.json";
import globalEn from "./lang/global/en.json";

export default defineI18nConfig(() => ({
	legacy: false,
	locale: "ar",
	fallbackLocale: "ar",
	defaultLocale: "ar",

	messages: {
		ar: {
			nav: navAr,
			home: homeAr,
			auth: authAr,
			hotels: hotelsAr,
			contact: contactAr,
			about: aboutAr,
			footer: footerAr,
			dashboard: dashboardAr,
			$vuetify: vuetifyAr,
			global: globalAr,
		},
		en: {
			nav: navEn,
			home: homeEn,
			hotels: hotelsEn,
			auth: authEn,
			contact: contactEn,
			about: aboutEn,
			dashboard: dashboardEn,
			footer: footerEn,
			$vuetify: vuetifyEn,
			global: globalEn,
		},
	},
}));
