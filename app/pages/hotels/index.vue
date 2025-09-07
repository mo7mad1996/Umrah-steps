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

        <pre class="text-start">{{ filters }}</pre>

        <!-- Results Count -->
        <div class="mb-6">
          <p class="text-gray-600 dark:text-gray-400">
            تم العثور على
            <span class="font-semibold text-primary">{{ hotels.length }}</span>
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
          <div
            v-for="hotel in hotels"
            :key="hotel.id"
            :class="
              filters.viewMode === 'grid'
                ? 'hotel-card-grid'
                : 'hotel-card-list'
            "
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <!-- Hotel Image -->
            <div
              :class="filters.viewMode === 'grid' ? 'h-48' : 'w-80 h-full'"
              class="relative overflow-hidden"
            >
              <NuxtImg
                :src="hotel.image"
                :alt="hotel.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <!-- Rating Badge -->
              <div
                class="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Icon name="mdi:star" class="text-yellow-500 text-sm" />
                <span
                  class="text-sm font-semibold text-gray-800 dark:text-white"
                  >{{ hotel.rating }}</span
                >
              </div>

              <!-- Favorite Button -->
              <button
                class="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <Icon
                  name="mdi:heart-outline"
                  class="text-gray-600 dark:text-gray-300 hover:text-red-500"
                />
              </button>
            </div>

            <!-- Hotel Info -->
            <div class="p-6 flex-1">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h3
                    class="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-primary transition-colors duration-300"
                  >
                    {{ hotel.name }}
                  </h3>
                  <div
                    class="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm"
                  >
                    <Icon name="mdi:map-marker" class="text-primary" />
                    <span>{{ hotel.location }}</span>
                  </div>
                </div>

                <div class="text-left">
                  <div
                    class="text-2xl font-bold text-primary dark:text-primary-dark"
                  >
                    {{ hotel.price }} ريال
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    لكل ليلة
                  </div>
                </div>
              </div>

              <!-- Hotel Features -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="feature in hotel.features"
                  :key="feature"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                  {{ feature }}
                </span>
              </div>

              <!-- Distance and Amenities -->
              <div class="flex items-center justify-between mb-4">
                <div
                  class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div class="flex items-center gap-1">
                    <Icon name="mdi:walk" class="text-primary" />
                    <span>{{ hotel.distance }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="mdi:wifi" class="text-primary" />
                    <span>واي فاي مجاني</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button
                  class="flex-1 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105"
                >
                  <Icon name="mdi:calendar-check" />
                  {{ $t("hotels.book") }}
                </button>
                <button
                  class="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <Icon name="mdi:information-outline" />
                </button>
              </div>
            </div>
          </div>
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
const filters = reactive({
  price: [0, Infinity],
  rating: [0, 5],
  distance: [0, Infinity],
  viewMode: "grid" as "list" | "grid",
});

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
  title: " حجوزات المعتمر",

  meta: [
    {
      name: "description",
      content:
        "اكتشف أفضل الفنادق في مكة المكرمة والمدينة المنورة مع حجوزات المعتمر",
    },
  ],
});
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
