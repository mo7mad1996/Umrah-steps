import type { IHotelResponse } from "~/types/hotel";

export const useHotels = (query: any = {}) => {
	const { $i18n } = useNuxtApp();

	const page = ref(1);
	const per_page = ref(query?.per_page || 12);
	const count = ref(0);
	const finished = ref(false);
	const hotels = ref<IHotelResponse[]>([]);

	const queryKey = computed(
		() => `hotels-${$i18n.locale.value}-${page.value}-${per_page.value}-${JSON.stringify(query)}`,
	);

	const { data, error, status, refresh } = useAsyncData(
		queryKey,
		() =>
			useApi()
				.get("/hotels", {
					params: {
						page: page.value,
						per_page: per_page.value,
						useLang: "true",
						...query,
					},
				})
				.then((res: any) => {
					const d = res.data?.data as IHotelResponse[];
					count.value = res.data?.count || 0;
					finished.value = !d || d.length < per_page.value;
					return d || [];
				})
				.catch(() => {
					count.value = 0;
					finished.value = true;
					return [];
				}),
		{ watch: [() => $i18n.locale, page, per_page] },
	);

	watch(
		[data, page],
		([newData, newPage]) => {
			if (!newData || !Array.isArray(newData)) return;

			if (newPage === 1) {
				hotels.value = newData;
			} else {
				hotels.value = [...hotels.value, ...newData];
			}
		},
		{ immediate: true },
	);

	const resetAndRefresh = async () => {
		page.value = 1;
		hotels.value = [];
		finished.value = false;
		await refresh();
	};

	return {
		data: hotels,
		error,
		status,
		refresh: resetAndRefresh,
		page,
		per_page,
		count,
		finished,
	};
};
