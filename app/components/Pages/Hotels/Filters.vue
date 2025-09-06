<template>
  <!-- Filters Section -->
  <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div class="flex flex-wrap items-center gap-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
        تصفية النتائج:
      </h3>

      <!-- Price Range -->
      <InputsSelect
        v-model="filters.price"
        :items="[
          { value: [0, Infinity], title: 'لا يشترط' },
          { value: [0, 500], title: 'اقتصادي (أقل من 500 ريال)' },
          { value: [500, 1000], title: 'متوسط (500 - 1000 ريال)' },
          { value: [1000, Infinity], title: 'فاخر (أكثر من 1000 ريال)' },
        ]"
        placeholder="نطاق السعر"
      />

      <!-- Star Rating -->
      <InputsSelect
        v-model="filters.rating"
        :items="[
          { value: [0, 5], title: 'لا يشترط' },
          { value: [3, 5], title: '3 نجوم فأكثر' },
          { value: [4, 5], title: '4 نجوم فأكثر' },
          { value: [5, 5], title: '5 نجوم' },
        ]"
        placeholder="تصنيف النجوم"
      />

      <!-- Distance -->
      <InputsSelect
        v-model="filters.distance"
        :items="[
          { value: [0, Infinity], title: 'لا يشترط' },
          { value: [0, 500], title: 'مشي (أقل من 500م)' },
          { value: [500, 1000], title: 'قريب (500م - 1كم) ' },
          { value: [1000, 2000], title: 'متوسط (1كم - 2كم) ' },
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
        v-model="filters.viewMode"
        name="viewMode"
        :data="[
          { icon: 'material-symbols:calendar-view-day', value: 'list' },
          { icon: 'mingcute:grid-fill', value: 'grid' },
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  filters: {
    price: number[];
    rating: number[];
    distance: number[];

    viewMode: "list" | "grid";
  };
}>();
</script>
