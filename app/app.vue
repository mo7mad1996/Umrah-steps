<template>
  <Html
    :dir="localeProperties.dir"
    :lang="localeProperties.code"
    :class="`${localeProperties.dir} ${dark && 'dark'}`"
  >
    <LayoutPageBorders>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </LayoutPageBorders>
  </Html>
</template>

<script setup lang="ts">
const { localeProperties, locale, t } = useI18n()

const dark = useCookie("dark")
watch(
  locale,
  () => {
    useHead({
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
