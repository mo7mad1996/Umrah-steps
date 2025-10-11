export default defineNuxtPlugin({
	hooks: {
		"vuetify:ready"(vuetify) {
			const theme = useCookie<"dark" | "light">("theme");
			if (!theme.value) return;
			vuetify.theme.change(theme.value);
		},
	},
});
