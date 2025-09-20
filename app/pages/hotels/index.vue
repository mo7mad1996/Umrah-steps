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

    <section class="py-8">
      <div class="container mx-auto px-6">
        <!-- Filters Section -->
        <PagesHotelsFilters :filters="filters" />

        <!-- Results Count -->
        <div class="mb-6">
          <p class="text-gray-600 dark:text-gray-400">
            تم العثور على
            <!-- <span class="font-semibold text-primary">{{ hotels.length }}</span> -->
            فندق
          </p>
        </div>

        <!-- Hotels Grid/List -->
        <div
          v-if="false"
          :class="{
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6':
              filters.viewMode === 'grid',
            'space-y-6': filters.viewMode === 'list',
          }"
        >
          <!-- <div
            v-for="hotel in hotels"
            :key="hotel.id"
            :class="
              filters.viewMode === 'grid'
                ? 'hotel-card-grid'
                : 'hotel-card-list'
            "
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <GlobalHotelsItem :hotel="hotel" />
          </div> -->
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
        {{ x }}
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const filters = reactive({
  price: [0, Infinity],
  rate: [0, 5],
  distance: [0, Infinity],
  viewMode: "grid" as "list" | "grid",
});

const page = ref(1);
// Sample hotel data
const x = computed(() => useHotels(12, page.value, filters));

// SEO
usePageTitle("hotels.title");
</script>

<style scoped>
.hotel-card-grid {
  @apply flex flex-col;
}

.hotel-card-list {
  @apply flex flex-row;
}

/* Smooth transitions for all interactive elements */
button,
select,
.hotel-card-grid,
.hotel-card-list {
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hotel-card-list {
    @apply flex-col;
  }

  .hotel-card-list .w-80 {
    @apply w-full h-48;
  }
}
</style>
