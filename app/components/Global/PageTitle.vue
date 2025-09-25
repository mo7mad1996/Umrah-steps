<template>
  <section class="text-black dark:!text-white py-16 md:py-24 mt-16 md:mt-20 relative">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center">
        <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
          {{ title }}
        </h1>

        <p class="text-base md:text-xl opacity-90 max-w-2xl mx-auto" v-if="subTitle">
          {{ subTitle }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subTitle?: string
}>()
</script>
