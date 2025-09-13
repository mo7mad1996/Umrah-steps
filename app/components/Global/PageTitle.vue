<template>
  <section class="text-black dark:text-white py-24 mt-20 relative">
    <div class="container mx-auto px-6">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ title }}
        </h1>

        <p class="text-xl opacity-90" v-if="subTitle">
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
