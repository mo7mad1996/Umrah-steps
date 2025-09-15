export const usePageTitle = (title: string) => {
  const { locale, t } = useI18n()

  watch(
    locale,
    () => {
      useHead({ title: t(title) })
    },
    { immediate: true }
  )
}
