import type { IHotelResponse } from "~/types/hotel";
import type { Ref } from "vue"; // ⬅️ استيراد Ref

export const useHotels = (queryRef: Ref<any> | any = {}) => {
	const { $i18n } = useNuxtApp();

	const page = ref(1);
	const per_page = ref(12);

	const count = ref(0);
	const finished = ref(false);
	const hotels = ref<IHotelResponse[]>([]);

	const currentQuery = computed(() => (isRef(queryRef) ? queryRef.value : queryRef));

	const queryKey = computed(
		() =>
			`hotels-${$i18n.locale.value}-${page.value}-${per_page.value}-${JSON.stringify(
				currentQuery.value,
			)}`,
	);

	const { data, error, status, refresh } = useAsyncData(
		queryKey,
		() => {
			const queryParams = currentQuery.value?.query || {};
			const { per_page: queryPerPage, ...restOfQuery } = queryParams;

			return useApi()
				.get("/hotels", {
					params: {
						page: page.value,
						per_page: per_page.value,
						useLang: "true",
						...restOfQuery,
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
				});
		},
		{
			watch: [() => $i18n.locale, page, per_page, currentQuery],
		},
	);

	watch(currentQuery, () => {
		resetAndRefresh();
	});

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
