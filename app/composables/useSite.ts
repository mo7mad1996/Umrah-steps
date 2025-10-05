export const useSite = () => {
	const { $i18n } = useNuxtApp();

	const { data, error, status, refresh } = useAsyncData(
		`site-config`,
		() => {
			useApi().defaults.headers.common["lang"] = $i18n.locale.value;

			return useApi()
				.get("/config")
				.then((r) => r.data);
		},
		{ watch: [() => $i18n.locale.value] },
	);

	return { data, error, status, refresh };
};
