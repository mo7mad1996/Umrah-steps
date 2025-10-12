export const usePageTitle = (title: string) => {
	const nuxtApp = useNuxtApp();

	watch(
		() => nuxtApp.$i18n.locale.value,
		() => {
			useHead({ title: nuxtApp.$i18n.t(title) });
		},
		{ immediate: true },
	);
};
