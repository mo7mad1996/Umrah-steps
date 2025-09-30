import type { Hotel } from "~/types/hotel";

export const useHotels = () => {
	const locale = useCookie("i18n_redirected");
	const page = ref(1);
	const per_page = ref(12);

	const { data, error, status, refresh } = useAsyncData<Hotel[]>(
		() => `hotels-${per_page.value}-${page.value}`,
		() =>
			useApi()
				.get("/hotels", {
					params: { page: page.value, per_page: per_page.value, lang: locale.value },
				})
				.then((r) => r.data),
		{ watch: [locale, page, per_page] },
	);

	return { data, error, status, refresh, page, per_page };
};
