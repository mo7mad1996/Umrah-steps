<template>
  <LayoutPageBorders>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </LayoutPageBorders>
</template>

<script setup lang="ts">
const { localeProperties, locale, t } = useI18n();

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
    });
  },
  { immediate: true }
);
</script>
