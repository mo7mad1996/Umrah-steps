import type { Hotel } from "~/types/hotel";

export const useHotels = (per_page: number = 12) => {
  const { locale } = useI18n();

  const { data, error, status, refresh } = useAsyncData<Hotel[]>(
    `hotels-${per_page}`,
    () =>
      useApi()
        .get("/hotels", {
          params: {
            page: 1,
            per_page,
            lang: locale.value,
          },
        })
        .then((r) => r.data),
    { watch: [locale] },
  );

  return { data, error, status, refresh };
};
