export const usePageTitle = (title: string) => {
	const { $i18n } = useNuxtApp();

	watch(
		() => $i18n.locale.value,
		() => {
			useHead({ title: $i18n.t(title) });
		},
		{ immediate: true },
	);
};
