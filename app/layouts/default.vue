<template>
  <div
    class="absolute w-full bg-primary pointer-events-none h-12 blur-3xl top-0 z-40"
  ></div>
  <LayoutHeader />
  <v-app class="font-cairo" :theme="dark ? 'dark' : 'light'" :class="{ dark }">
    <div>
      <v-main class="bg-neutral-50 dark:!bg-zinc-950 min-h-dvh flex flex-col">
        <div class="flex-1">
          <slot />
        </div>
        <LayoutFooter />
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
const dark = useCookie("dark")
</script>
