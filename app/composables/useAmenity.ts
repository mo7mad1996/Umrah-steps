import { useApi, useI18n } from "#imports";
import { ref } from "vue";
import type { IAmenity } from "~/types/hotel";

export const useAmenity = (query: any = undefined) => {
	const { locale } = useI18n();
	const page = ref(1);
	const per_page = ref(query?.per_page || 1000);

	const { data, error, status, refresh } = useAsyncData(
		`amenity-${per_page.value}-${page.value}`,

		() =>
			useApi()
				.get("/amenity", {
					params: { page: page.value, per_page: per_page.value, ...query },
				})
				.then(({ data }: { data: IAmenity[] }) => {
					return data;
				}),

		{ watch: [locale, page, per_page] },
	);

	return { data, error, status, refresh };
};
