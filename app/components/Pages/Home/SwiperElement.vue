<template>
  <div
    v-if="data"
    class="flex flex-col transition-all duration-300 p-1 h-full"
    :style="{ scale }"
  >
    <GlobalHotelsItem :hotel="data" />
  </div>
</template>

<script setup lang="ts">
import type { Swiper } from "swiper/types"
import type { Hotel } from "~/types/hotel"
import { useSwiperSlide, useSwiper } from "swiper/vue"

// config
const { locale } = useI18n()
const props = defineProps<{ data: Hotel }>()
const swiper = useSwiper()
const slide = useSwiperSlide()

// data
const scale = ref(0.8)
const active = computed(() => scale.value > 0.8)

// methods
const changeScale = (c: Swiper) => {
  const { isNext, isActive, isPrev, isVisible } = slide.value

  if (!isPrev && !isNext && !isActive && !isVisible) return (scale.value = 0.8)

  if (isActive) scale.value = 1
  else scale.value = 0.8
}

const forceScale = () => {
  const { isActive } = slide.value

  if (isActive) scale.value = 1
  else scale.value = 0.8
}

// events
swiper.value.on("slideNextTransitionStart", changeScale)
swiper.value.on("slidePrevTransitionStart", changeScale)

swiper.value.on("afterInit", forceScale)
</script>
