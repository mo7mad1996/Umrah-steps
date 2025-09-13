<template>
  <main class="">
    <PagesHomeHero />
    <PagesHomeSwiper />
    <PagesHomeHotels />
  </main>
</template>

<script setup>
const { t, locale } = useI18n()

watch(locale, () => {
  useHead({
    title: t("home.title"),
  })
})
</script>
