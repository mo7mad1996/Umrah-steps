import type { Hotel } from "~/types/hotel"

export const useHotels = (
  per_page: number = 12,
  page: number = 1,
  query: any = undefined,
  includes: undefined | string = undefined,
  useLang: boolean = true
) => {
  const { locale } = useI18n()

  const { data, error, status, refresh } = useAsyncData<Hotel[]>(
    `hotels-${page}-${per_page}`,
    () =>
      useApi()
        .get("/hotels", {
          params: {
            page,
            per_page,
            query,
            includes,
            lang: useLang ? locale.value : undefined,
          },
        })
        .then((r) => r.data),
    { watch: [locale] }
  )

  return { data, error, status, refresh }
}

