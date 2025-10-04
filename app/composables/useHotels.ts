import type { IHotelResponse } from "~/types/hotel";

export const useHotels = (query: any = undefined) => {
	const { locale } = useI18n();
	const page = ref(1);
	const per_page = ref(query?.per_page || 12);
	const count = ref(0);
	const finished = ref(false);

	const { data, error, status, refresh } = useAsyncData(
		`hotels-${per_page.value}-${page.value}`,

		() =>
			useApi()
				.get("/hotels", {
					params: { page: page.value, per_page: per_page.value, useLang: "true", ...query },
				})
				.then((res: any) => {
					const d = res.data?.data as IHotelResponse[];
					count.value = res.data.count as number;
					return d || [];
				}),
		{ watch: [locale, page, per_page] },
	);

	const hotels = ref<IHotelResponse[]>([]);
	watch(
		data,
		(d) => {
			if (!d || !Array.isArray(d)) return; // ✅ prevent null destructure
			if (d.length < per_page.value) finished.value = true;
			hotels.value = [...hotels.value, ...d];
		},
		{ immediate: true },
	);

	return {
		data: hotels.value,
		error: null,
		status: "success",
		refresh: () => {},
		page,
		per_page,
		count,
		finished,
	};
};
