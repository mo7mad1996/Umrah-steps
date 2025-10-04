import { useApi, useI18n } from "#imports";
import { ref } from "vue";
import type { IHotelListResponse, IHotelResponse } from "~/types/hotel";

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
				.then(({ data }: { data: IHotelListResponse }) => {
					const d = data.data;
					count.value = data.count;
					return d as IHotelResponse[];
				}),

		{ watch: [locale, page, per_page] },
	);

	const hotels = ref<IHotelResponse[]>([]);
	watch(
		data,
		(d) => {
			if (!Array.isArray(d)) return; // ✅ prevent null destructure

			if (d.length < per_page.value) finished.value = true;
			hotels.value = [...hotels.value, ...d];
		},
		{ immediate: true },
	);

	return { data: hotels, error, status, refresh, page, per_page, count, finished };
};
