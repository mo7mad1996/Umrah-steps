<template>
  <div class="pb-20">
    <div
      class="rounded-3xl bg-violet-100 dark:!bg-neutral-800 p-12 container mx-auto"
    >
      <div class="grid grid-cols-2">
        <div>
          <h1 class="text-yellow-800 dark:!text-yellow-300 text-3xl">
            {{ $t("home.hotels.title") }}
          </h1>
          <p class="opacity-90 text-sm text-yellow-800 dark:!text-yellow-300">
            {{ $t("home.hotels.description") }}
          </p>
        </div>

        <div class="flex gap-4 items-start">
          <Form class="flex-1">
            <InputsText
              icon="mdi-magnify"
              :placeholder="`${$t('search')}...`"
            />
          </Form>

          <NuxtLink
            to="/hotels"
            class="border rounded-full w-fit border-black text-white bg-black dark:!text-black dark:!bg-white flex items-center p-px"
          >
            <div class="px-5">
              {{ $t("more") }}
            </div>

            <span
              class="dark:!bg-black bg-white grid place-content-center p-1.5 rounded-full text-2xl"
            >
              <Icon
                name="material-symbols:arrow-outward"
                class="dark:!text-white text-black rtl:-rotate-90"
              ></Icon>
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- slider -->

      <div class="mt-12">
        <Swiper
          :dir="localeProperties.dir"
          :key="localeProperties.dir"
          :modules="[Navigation]"
          :autoplay="true"
          :slides-per-view="2"
          :slides-per-group="1"
          :breakpoints="{
            640: { slidesPerView: 1 }, // sm
            768: { slidesPerView: 2 }, // md
            1024: { slidesPerView: 3 }, // lg
            1280: { slidesPerView: 3 }, // xl
          }"
          ref="swiperRef"
          :space-between="30"
          @slideChange="swiperRef?.updateSlides"
          @swiper="onSwiper"
          :navigation="{
            nextEl: '.next2',
            prevEl: '.prev2',
          }"
        >
          <SwiperSlide v-for="(hotel, n) in hotels" :key="n">
            <GlobalHotelsItem :hotel="hotel" />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- slider buttons -->
      <div
        class="flex gap-2 items-center ms-auto w-fit rtl:flex-row-reverse p-2"
      >
        <button
          class="prev2 backdrop-blur-sm p-2 text-xl border rounded-full aspect-square text-black bg-white border-opacity-100 grid place-content-center border-black"
        >
          <Icon name="material-symbols:arrow-left-alt-rounded"></Icon>
        </button>
        <button
          class="next2 backdrop-blur-sm p-2 text-xl border rounded-full aspect-square text-white bg-black border-opacity-100 grid place-content-center border-black"
        >
          <Icon name="material-symbols:arrow-right-alt-rounded"></Icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import { Form } from "vee-validate"
import type { Swiper as SwiperType } from "swiper/types"

const { data: hotels } = useHotels()

const { localeProperties } = useI18n()
const swiperRef = ref<SwiperType>()
const onSwiper = (s: SwiperType) => (swiperRef.value = s)
</script>
