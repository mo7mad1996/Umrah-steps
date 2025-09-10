import type { Hotel } from "~/types/Hotel";

export const useHotels = (per_page: number = 12, page: number = 1) => {
  const { data, error, status, refresh } = useAsyncData<Hotel[]>(
    `hotels-${page}-${per_page}`,
    () =>
      useApi()
        .get("/hotels", { params: { page, per_page } })
        .then((r) => r.data)
  );

  return { data, error, status, refresh };
};
