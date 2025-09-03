<template>
  <div class="h-0 select-none pointer-events-none relative">
    <div class="relative">
      <NuxtImg
        :src="src"
        class="mask w-screen h-screen object-cover object-center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string;
}>();
</script>

<style lang="scss" scoped>
.mask {
  mask-image: linear-gradient(black, transparent 50%);
}
</style>
