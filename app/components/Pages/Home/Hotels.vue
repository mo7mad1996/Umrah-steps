<template>
  <div class="pb-20">
    <div
      class="rounded-3xl bg-violet-100 dark:!bg-neutral-800 p-6 md:p-12 container mx-auto"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div>
          <h1 class="text-yellow-800 dark:!text-yellow-300 text-2xl md:text-3xl font-bold">
            {{ $t("home.hotels.title") }}
          </h1>
          <p class="opacity-90 text-sm md:text-base text-yellow-800 dark:!text-yellow-300 mt-2">
            {{ $t("home.hotels.description") }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 items-start">
          <Form class="flex-1">
            <InputsText
              icon="mdi-magnify"
              :placeholder="`${$t('search')}...`"
            />
          </Form>

          <NuxtLink
            to="/hotels"
            class="border rounded-full w-fit border-black text-white bg-black dark:!text-black dark:!bg-white flex items-center p-px hover:scale-105 transition-transform"
          >
            <div class="px-4 md:px-5 text-sm md:text-base">
              {{ $t("more") }}
            </div>

            <span
              class="dark:!bg-black bg-white grid place-content-center p-1.5 rounded-full text-xl md:text-2xl"
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
      <template v-if="status == 'success'">
        <div class="mt-8 md:mt-12">
          <Swiper
            v-if="status == 'success'"
            :dir="localeProperties.dir"
            :key="localeProperties.dir"
            :modules="[Navigation]"
            :autoplay="true"
            :slides-per-view="Math.min(length, 2)"
            :slides-per-group="1"
            :breakpoints="{
              320: { slidesPerView: Math.min(length, 1), spaceBetween: 15 },
              768: { slidesPerView: Math.min(length, 2), spaceBetween: 20 },
              1024: { slidesPerView: Math.min(length, 3), spaceBetween: 30 },
            }"
            ref="swiperRef"
            :space-between="20"
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
          class="flex gap-2 items-center ms-auto w-fit rtl:flex-row-reverse p-2 mt-4"
        >
          <button
            class="prev2 backdrop-blur-sm p-2 text-lg md:text-xl border rounded-full aspect-square text-black bg-white border-opacity-100 grid place-content-center border-black hover:scale-110 transition-transform"
          >
            <Icon name="material-symbols:arrow-left-alt-rounded"></Icon>
          </button>
          <button
            class="next2 backdrop-blur-sm p-2 text-lg md:text-xl border rounded-full aspect-square text-white bg-black border-opacity-100 grid place-content-center border-black hover:scale-110 transition-transform"
          >
            <Icon name="material-symbols:arrow-right-alt-rounded"></Icon>
          </button>
        </div>
      </template>
      <GlobalError :error="error" :status="status" :refresh="refresh" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { Form } from "vee-validate";
import type { Swiper as SwiperType } from "swiper/types";

const { data: hotels, error, refresh, status } = useHotels();
const length = computed(() => hotels.value?.length || 0);

const { localeProperties } = useI18n();
const swiperRef = ref<SwiperType>();
const onSwiper = (s: SwiperType) => {
  swiperRef.value = s;

  update();
};

const update = () => {
  swiperRef.value?.navigation?.init();
  swiperRef.value?.navigation?.update();
  swiperRef.value?.updateSlidesClasses();
  swiperRef.value?.updateSlides();
  swiperRef.value?.update();
};

onMounted(update);
</script>
