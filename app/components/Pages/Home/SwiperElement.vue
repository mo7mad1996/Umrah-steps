<template>
  <div
    v-if="data"
    class="flex flex-col transition-all duration-300"
    :style="{ scale }"
  >
    <div class="rounded-3xl overflow-hidden flex-1 relative">
      <NuxtImg
        class="w-full block object-cover transition-all duration-500 h-96"
        :src="data.img"
        :alt="data.name[locale]"
      />

      <div class="absolute top-0 inset-0 p-4">
        <div class="flex justify-between flex-col h-full">
          <h2
            class="backdrop-blur-md px-4 py-2 w-fit rounded-full text-harmony1-dark bg-white/20 border !border-harmony1-dark border-opacity-100"
          >
            {{ data.name[locale] }}
          </h2>

          <p
            class="h-0 transition-all duration-500 overflow-hidden text-lg font-bold"
            :class="{
              '!h-1/2 bg-white/2 p-3 backdrop-blur-lg ': active,
            }"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
            officia magnam qui accusantium laboriosam, dolores voluptatem
            inventore in amet ullam harum repellendus quo aliquam aperiam. Ipsum
            expedita dicta adipisci nihil.
          </p>
        </div>
      </div>
    </div>
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
