<template>
  <main class="pb-12 p-4">
    <PagesHomeHero />
    <PagesHomeSwiper />
    <PagesHomeHotels />
  </main>
</template>

<script setup>
const { t, locale } = useI18n();

watch(locale, () => {
  useHead({
    title: t("home.title"),
  });
});
</script>
