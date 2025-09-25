<template>
  <div class="container mx-auto px-4 md:px-6">
    <h1 class="text-2xl md:text-4xl lg:text-6xl text-center my-16 md:my-24 lg:my-32 leading-tight">
      {{ $t("home.swiper.headline") }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-if="status == 'pending'">
      <div
        class="bg-gray-300 animate-pulse h-64 md:h-80 rounded-3xl"
        v-for="n in 3"
        :key="n"
      ></div>
    </div>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8" v-if="status == 'success'">
      <div class="lg:col-span-1 px-2 md:px-4">
        <div class="border px-4 md:px-6 py-2 rounded-full text-xs md:text-sm w-fit">
          {{ $t("nav.about") }}
        </div>

        <p class="text-xl md:text-2xl lg:text-3xl my-4 md:my-6 leading-relaxed">
          {{ $t("home.swiper.about_us") }}
        </p>

        <NuxtLink
          to="/about"
          class="border rounded-full w-fit border-black text-white bg-black dark:!text-black dark:!bg-white my-8 md:my-16 lg:my-28 flex items-center p-px hover:scale-105 transition-transform"
        >
          <div class="px-4 md:px-5 text-base md:text-xl">{{ $t("more") }}</div>

          <span
            class="dark:!bg-black bg-white grid place-content-center p-1.5 rounded-full text-xl md:text-3xl"
          >
            <Icon
              name="material-symbols:arrow-outward"
              class="dark:!text-white text-black rtl:-rotate-90"
            ></Icon>
          </span>
        </NuxtLink>
      </div>

      <!-- swiper -->
      <div class="lg:col-span-2">
        <Swiper
          class="items-stretch"
          auto-height
          :dir="localeProperties.dir"
          :key="localeProperties.dir"
          :modules="[Navigation]"
          :autoplay="true"
          ref="swiperRef"
          @swiper="onSwiper"
          :breakpoints="{
            320: { slidesPerView: Math.min(length, 1), spaceBetween: 15 },
            640: { slidesPerView: Math.min(length, 1), spaceBetween: 20 },
            768: { slidesPerView: Math.min(length, 2), spaceBetween: 25 },
          }"
          :navigation="{
            nextEl: '.next',
            prevEl: '.prev',
          }"
          :loop="length > 2"
        >
          <SwiperSlide v-for="(hotel, n) in hotels" :key="n">
            <PagesHomeSwiperElement :data="hotel" />
          </SwiperSlide>
        </Swiper>

        <!-- buttons -->
        <div
          class="flex gap-2 items-center ms-auto w-fit rtl:flex-row-reverse p-2 mt-4"
        >
          <button
            class="prev backdrop-blur-sm p-2 text-lg md:text-xl border rounded-full aspect-square text-black bg-white border-opacity-100 grid place-content-center border-black hover:scale-110 transition-transform"
          >
            <Icon name="material-symbols:arrow-left-alt-rounded"></Icon>
          </button>
          <button
            class="next backdrop-blur-sm p-2 text-lg md:text-xl border rounded-full aspect-square text-white bg-black border-opacity-100 grid place-content-center border-black hover:scale-110 transition-transform"
          >
            <Icon name="material-symbols:arrow-right-alt-rounded"></Icon>
          </button>
        </div>
      </div>
    </section>

    <GlobalError
      class="col-span-2"
      :error="error"
      :status="status"
      :refresh="refresh"
    />
    <hr class="container mx-auto my-12 md:my-20" />
  </div>
</template>

<script setup lang="ts">
import type { Swiper as SwiperType } from "swiper/types"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/css"

// setup
const { locale, localeProperties } = useI18n()
const { data: hotels, status, error, refresh } = useHotels(5)

// data
const swiperRef = ref<SwiperType>()
const length = computed(() => hotels.value?.length || 0)

// methods
const onSwiper = (swiper: SwiperType) => {
  swiperRef.value = swiper

  update()
}

const update = () => {
  swiperRef.value?.navigation?.init()
  swiperRef.value?.navigation?.update()
  swiperRef.value?.updateSlidesClasses()
  swiperRef.value?.updateSlides()
  swiperRef.value?.update()
}

onMounted(update)
// watch
watch(
  locale,
  () => {
    if (!swiperRef.value?.updateSlides) return

    update()
  },
  { immediate: true }
)
</script>
