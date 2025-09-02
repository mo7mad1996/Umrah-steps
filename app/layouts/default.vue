<template>
  <v-app class="font-cairo" :theme="dark ? 'dark' : 'light'" :class="{ dark }">
    <div
      class="absolute w-full bg-cyan-400 pointer-events-none h-12 blur-3xl top-0 z-40"
    ></div>
    <LayoutHeader />

    <v-main class="bg-neutral-50 dark:!bg-zinc-950">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
const dark = useCookie("dark");
</script>
