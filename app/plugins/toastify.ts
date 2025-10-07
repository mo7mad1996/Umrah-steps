export default defineNuxtPlugin({
	// setup() {
	// const obj = useNuxtApp();
	// console.log(obj);
	// updateGlobalOptions({
	// 	rtl: $i18n.localeProperties.value.dir == "rtl",
	// });
	// },
	hooks: {
		"vuetify:ready"(vuetify) {
			const theme = useCookie<"dark" | "light">("theme");
			if (!theme.value) return;
			vuetify.theme.change(theme.value);
		},
		"app:created"() {
			console.clear();
		},
	},
});
