<template>
  <!-- Filters Section -->
  <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div class="flex flex-wrap items-center gap-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
          تصفية النتائج:
        </h3>

        <div class="flex gap-4 items-center">
          <div>
            <!-- Price Range -->
            <span class="text-sm my-5 block text-gray-600 dark:text-gray-400">
              {{ $t("hotels.priceRange") }}:
            </span>
            <InputsSelect
              v-model="filters.price"
              :items="[
                { value: [0, Infinity], title: 'لا يشترط' },
                { value: [0, 500], title: 'اقتصادي (أقل من 500 ريال)' },
                { value: [500, 1000], title: 'متوسط (500 - 1000 ريال)' },
                { value: [1000, Infinity], title: 'فاخر (أكثر من 1000 ريال)' },
              ]"
            />
          </div>

          <!-- Star Rating -->
          <div>
            <span class="text-sm my-5 block text-gray-600 dark:text-gray-400">
              {{ $t("hotels.rating") }}:
            </span>
            <InputsSelect
              v-model="filters.rate"
              :items="[
                { value: [0, 5], title: 'لا يشترط' },
                { value: [3, 5], title: '3 نجوم فأكثر' },
                { value: [4, 5], title: '4 نجوم فأكثر' },
                { value: [5, 5], title: '5 نجوم' },
              ]"
            />
          </div>

          <!-- Distance -->

          <div>
            <span class="text-sm my-5 block text-gray-600 dark:text-gray-400">
              {{ $t("hotels.distance") }}:
            </span>
            <InputsSelect
              v-model="filters.distance"
              :items="[
                { value: [0, Infinity], title: 'لا يشترط' },
                { value: [0, 500], title: 'مشي (أقل من 500م)' },
                { value: [500, 1000], title: 'قريب (500م - 1كم) ' },
                { value: [1000, 2000], title: 'متوسط (1كم - 2كم) ' },
              ]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- here we are -->
    <div>
      <span class="text-sm my-5 block text-gray-600 dark:text-gray-400">
        {{ $t("hotels.viewMode") }}:
      </span>

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
    rate: number[];
    distance: number[];
    viewMode: "list" | "grid";
  };
}>();
</script>
