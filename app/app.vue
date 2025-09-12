<template>
  <LayoutPageBorders>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </LayoutPageBorders>
</template>

<script setup lang="ts">
const { localeProperties, locale, t } = useI18n()

watch(
  locale,
  () => {
    useHead({
      htmlAttrs: {
        dir: localeProperties.value.dir,
        lang: localeProperties.value.code,
        class: localeProperties.value.dir,
      },
      titleTemplate: (title) =>
        [title, t("site_name")].filter((i) => i).join(" ⁘ "),
    })
  },
  { immediate: true }
)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from {
  opacity: 0.4;
  transform: perspective(1000px) translateZ(50px);
}
.page-leave-to {
  opacity: 0;
  transform: perspective(1000px) translateZ(-50px);
}
</style>
