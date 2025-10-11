import { defineRule, configure } from "vee-validate";
import { all } from "@vee-validate/rules";
import { useCookie } from "nuxt/app";
import { type CookieRef } from "nuxt/app";

interface validationMessages {
	[rulName: string]: string;
}

interface Dictionary {
	[locale: string]: validationMessages;
}

const dictionary: Dictionary = {
	en: {
		required: "This field  is required.",
		email: "This field  must be a valid email.",
		min: "This field  is too short.",
		englishNumbersOnly: "Only English numbers are allowed.",
		confirmed: "This field does not match.",
		default: "This field is invalid.",
	},
	ar: {
		required: "هذا الحقل مطلوب",
		email: "هذا الحقل يجب ان يكون بريدا صالحا",
		min: "هذا الحقل قصير جدا",
		englishNumbersOnly: "الارقام الانجليزيه فقط",
		confirmed: "الحقل غير متطابق",
		default: "هذا الحقل غير صالح",
	},
};

// A helper function to retrieve messages
function getMessage(locale: string, ruleName: string, field: string) {
	const localeDict = dictionary[locale] || dictionary.ar;
	if (!locale) return ruleName;

	// @ts-ignore
	return localeDict[ruleName] || localeDict.default || `This field is invalid.`;
}

export default defineNuxtPlugin(() => {
	let currentLocale: CookieRef<string | null | undefined>;
	let locale: CookieRef<string | null | undefined> | string;

	Object.entries(all).forEach(([ruleName, ruleFn]) => defineRule(ruleName, ruleFn));

	// Configure custom message generator
	configure({
		generateMessage: (ctx) => {
			if (!ctx.rule) return `Field ${ctx.field} is invalid.`;

			currentLocale = useCookie("i18n_redirected");
			locale = currentLocale.value || "ar";

			return getMessage(locale, ctx.rule.name, ctx.field);
		},
	});
});
