import type { Hotel } from "~/types/hotel";

export const useHotels = (per_page: number = 12, page: number = 1) => {
	const locale = useCookie("i18n_redirected");
	const { data, error, status, refresh } = useAsyncData<Hotel[]>(
		`hotels-${per_page}`,
		() =>
			useApi()
				.get("/hotels", {
					params: { page, per_page, lang: locale.value },
				})
				.then((r) => r.data),
		{ watch: [locale, () => page, () => per_page] },
	);

	return { data, error, status, refresh };
};
