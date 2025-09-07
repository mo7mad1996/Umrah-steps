<template>
  <div class="container mx-auto">
    <h1 class="text-6xl text-center my-32">{{ $t("home.swiper.headline") }}</h1>

    <section class="grid grid-cols-3">
      <div class="px-4">
        <div class="border px-6 py-2 rounded-full text-sm w-fit">
          {{ $t("nav.about") }}
        </div>

        <p class="text-3xl my-6 leading-relaxed">
          {{ $t("home.swiper.about_us") }}
        </p>

        <NuxtLink
          to="/about"
          class="border rounded-full w-fit border-black text-white bg-black dark:!text-black dark:!bg-white my-28 flex items-center p-px"
        >
          <div class="px-5 text-xl">
            {{ $t("more") }}
          </div>

          <span
            class="dark:!bg-black bg-white grid place-content-center p-1.5 rounded-full text-3xl"
          >
            <Icon
              name="material-symbols:arrow-outward"
              class="dark:!text-white text-black rtl:-rotate-90"
            ></Icon>
          </span>
        </NuxtLink>
      </div>

      <div class="col-span-2">
        <Swiper
          :dir="localeProperties.dir"
          :key="localeProperties.dir"
          :modules="[Navigation]"
          :autoplay="true"
          ref="swiperRef"
          :slides-per-view="2"
          @slideChange="swiperRef?.updateSlides"
          @swiper="onSwiper"
          :navigation="{
            nextEl: '.next',
            prevEl: '.prev',
          }"
          :loop="true"
        >
          <SwiperSlide v-for="n in 5" :key="n">
            <PagesHomeSwiperElement />
          </SwiperSlide>
        </Swiper>
        <!-- 
          effect="creative"
         :creative-effect="{
            limitProgress: 2,
            perspective: true,
            prev: {
              translate: ['-200%', 0, 0],
              scale: 1.2,
            },
            next: {
              translate: ['100%', 0, 0],
              scale: 0.7,
            },
          }"
           -->
        <div
          class="flex gap-2 items-center ms-auto w-fit rtl:flex-row-reverse p-2"
        >
          <button
            class="prev backdrop-blur-sm p-2 text-xl border rounded-full aspect-square text-black bg-white border-opacity-100 grid place-content-center border-black"
          >
            <Icon name="material-symbols:arrow-left-alt-rounded"></Icon>
          </button>
          <button
            class="next backdrop-blur-sm p-2 text-xl border rounded-full aspect-square text-white bg-black border-opacity-100 grid place-content-center border-black"
          >
            <Icon name="material-symbols:arrow-right-alt-rounded"></Icon>
          </button>
        </div>
      </div>
    </section>
    <hr class="container mx-auto my-20" />
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import type { Swiper as SwiperType } from "swiper/types";

const { locale, localeProperties } = useI18n();
const swiperRef = ref<SwiperType>();

const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper;
};

watch(
  locale,
  () => {
    if (!swiperRef.value?.updateSlides) return;
    swiperRef.value?.updateSlides();
    swiperRef.value?.updateSlidesClasses();
    swiperRef.value?.update();
  },
  {
    immediate: true,
  }
);
</script>
