export const useSite = () => {
	const { locale } = useI18n();

	const { data, error, status, refresh } = useAsyncData(
		`site-config`,
		() => {
			useApi().defaults.headers.common["lang"] = locale.value;

			return useApi()
				.get("/config")
				.then((r) => r.data);
		},
		{ watch: [locale] },
	);

	return { data, error, status, refresh };
};
