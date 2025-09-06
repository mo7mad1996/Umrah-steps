<template>
  <slot></slot>
  <div
    v-for="p in positions"
    :key="p"
    :style="getStyle(p)"
    class="fixed bg-gray-950 aspect-square w-3 rotate-180 mask-me pointer-events-none"
  ></div>
</template>

<script setup lang="ts">
const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];

const getStyle = (p: string) => {
  return [
    `--position: ` + p.split("-").join(" "),
    p
      .split("-")
      .map((i) => i + ": 0px")
      .join("; "),
  ].join("; ");
};
</script>

<style lang="scss" scoped>
.mask-me {
  mask-image: radial-gradient(
    circle at var(--position),
    transparent 70%,
    black 70%
  );
}
</style>
