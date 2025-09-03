<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-zinc-950 relative">
    <!-- background -->
    <GlobalImageMask src="/images/hotel2.jpeg" />

    <!-- Page Header -->
    <GlobalPageTitle
      :title="$t('hotels.title')"
      :subTitle="$t('hotels.subtitle')"
    />

    <!-- Search Form Section -->
    <div class="container mx-auto">
      <GlobalHotelsFormSearch />
    </div>

    <!-- Filters Section -->
    <section class="py-8">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div class="flex flex-wrap items-center gap-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              تصفية النتائج:
            </h3>

            <!-- Price Range -->
            <InputsSelect
              :items="[
                { value: '', title: 'لا يشترط' },
                { value: 'budget', title: 'اقتصادي (أقل من 500 ريال)' },
                { value: 'mid', title: 'متوسط (500 - 1000 ريال)' },
                { value: 'luxury', title: 'فاخر (أكثر من 1000 ريال)' },
              ]"
              placeholder="نطاق السعر"
            />

            <!-- Star Rating -->
            <InputsSelect
              :items="[
                { value: '', title: 'لا يشترط' },
                { value: '3', title: '3 نجوم فأكثر' },
                { value: '4', title: '4 نجوم فأكثر' },
                { value: '5', title: '5 نجوم' },
              ]"
              placeholder="تصنيف النجوم"
            />

            <!-- Distance -->
            <InputsSelect
              :items="[
                { value: '', title: 'لا يشترط' },
                { value: 'walking', title: 'مشي (أقل من 500م)' },
                { value: 'close', title: 'قريب (500م - 1كم) ' },
                { value: 'moderate', title: 'متوسط (1كم - 2كم) ' },
              ]"
              placeholder="المسافة من الحرم"
            />
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">عرض:</span>

            <InputsRadio
              class="dark:!bg-transparent"
              activeClass="dark:!bg-transparent dark:!border-gold dark:border  dark:text-yellow-400 dark:hover:!bg-white/20"
              itemClass="dark:text-gray-600/80 dark:hover:!bg-white/20"
              v-model="viewMode"
              name="viewMode"
              :data="[
                { icon: 'material-symbols:calendar-view-day', value: 'list' },
                { icon: 'mingcute:grid-fill', value: 'grid' },
              ]"
            />
          </div>
        </div>

        <!-- Results Count -->
        <div class="mb-6">
          <p class="text-gray-600 dark:text-gray-400">
            تم العثور على
            <span class="font-semibold text-primary">{{ hotels.length }}</span>
            فندق
          </p>
        </div>

        <!-- Load More Button -->

        <div class="text-center mt-12">
          <button
            class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
          >
            <Icon name="mdi:reload" />

            تحميل المزيد من الفنادق
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const viewMode = ref("grid");

// Sample hotel data
const hotels = ref([
  {
    id: 1,
    name: "فندق دار التوحيد إنتركونتيننتال",
    location: "مكة المكرمة - أبراج البيت",
    price: 1200,
    rating: 4.8,
    distance: "50 متر من الحرم",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    features: ["إطلالة على الحرم", "مطعم حلال", "خدمة الغرف"],
  },

  {
    id: 6,
    name: "فندق الإيمان طيبة",
    location: "المدينة المنورة - قباء",
    price: 450,
    rating: 4.2,
    distance: "1 كم من المسجد النبوي",
    image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
    features: ["أسعار اقتصادية", "نظافة عالية", "خدمة ودودة"],
  },
]);

// SEO
useHead({
  title: "الفنادق - خطوات المعتمر",

  meta: [
    {
      name: "description",
      content:
        "اكتشف أفضل الفنادق في مكة المكرمة والمدينة المنورة مع خطوات المعتمر",
    },
  ],
});
</script>
