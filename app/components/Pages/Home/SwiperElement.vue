<template>
  <div
    v-if="data"
    class="flex flex-col transition-all duration-300"
    :style="{ scale }"
  >
    <GlobalHotelsItem :hotel="data" />
  </div>
</template>

<script setup lang="ts">
import type { Swiper } from "swiper/types";
import { useSwiperSlide, useSwiper } from "swiper/vue";
const { locale } = useI18n();

const swiper = useSwiper();
const slide = useSwiperSlide();
const scale = ref(0.8);

const active = computed(() => scale.value > 0.8);

const changeScale = (c: Swiper) => {
  const { isNext, isActive, isPrev, isVisible } = slide.value;

  if (!isPrev && !isNext && !isActive && !isVisible) return (scale.value = 0.8);

  if (isActive) scale.value = 1;
  else scale.value = 0.8;
};

const forceScale = () => {
  const { isActive } = slide.value;

  if (isActive) scale.value = 1;
  else scale.value = 0.8;
};
swiper.value.on("slideNextTransitionStart", changeScale);
swiper.value.on("slidePrevTransitionStart", changeScale);
// swiper.value.on("beforeSlideChangeStart", changeScale);
// swiper.value.on("navigationShow", changeScale);

// swiper.value.on("activeIndexChange", forceScale);
// swiper.value.on("init", forceScale);
swiper.value.on("afterInit", forceScale);
// swiper.value.on("slidePrevTransitionEnd", forceScale);
// swiper.value.on("slideNextTransitionEnd", forceScale);

const data = {
  id:1,
  img: "https://tomschneider.co.uk/cdn/shop/files/Dune_Bed_large_walnut_DU0601_orbitbedside_tables_tom_schneider_4_1600x.jpg",
  name: {
    ar: "فندق المسافر",
    en: "Travel hotel",
  },
  location: {
    name: {
      ar: "مصر",
      en: "Egypt",
    },
  },
};
</script>
