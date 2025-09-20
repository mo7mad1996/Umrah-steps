<template>
  <div class="grid p-12 place-content-center h-full">
    <NuxtImg
      :src="`/logo/vertical.png`"
      class="h-full w-full object-contain opacity-50"
    />
  </div>
</template>

<script setup lang="ts">
usePageTitle("dashboard.profile_settings");
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
