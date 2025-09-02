<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
    <!-- Page Header -->
    <section class="gradient-bg text-white py-24 mt-20">
      <div class="container mx-auto px-6">
        <div class="text-center">
          <h1
            class="text-4xl md:text-5xl font-bold mb-4"
            style="font-family: 'Cairo', sans-serif"
          >
            {{ $t("hotels.title") }}
          </h1>
          <p class="text-xl opacity-90">
            {{ $t("hotels.subtitle") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Search Form Section -->
    <section class="py-12">
      <div class="container mx-auto px-6">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 -mt-16 relative z-10">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            {{ $t("hotels.search") }}
          </h2>
          
          <Form>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Destination -->
              <div>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t("dashboard.destination") }}
                </h3>
                <InputsSelect
                  :items="[
                    { value: 1, title: 'مكة المكرمة' },
                    { value: 2, title: 'المدينة المنورة' },
                    { value: 3, title: 'الرياض' },
                    { value: 4, title: 'جدة' },
                    { value: 5, title: 'الطائف' },
                  ]"
                  customClass="shadow-lg !bg-neutral-100 dark:!bg-gray-700"
                  :placeholder="$t('dashboard.destination')"
                >
                  <template #icon>
                    <Icon name="bi:flag-fill" class="dark:text-white"></Icon>
                  </template>
                </InputsSelect>
              </div>

              <!-- Dates -->
              <div class="grid grid-cols-2 gap-4 lg:col-span-2">
                <div>
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ $t("dashboard.arrival_date") }}
                  </h3>
                  <InputsDate
                    customClass="shadow-lg !bg-neutral-100 dark:!bg-gray-700"
                    name="arrival_date"
                    format="yyyy-MM-dd"
                  />
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ $t("dashboard.return_date") }}
                  </h3>
                  <InputsDate
                    customClass="shadow-lg !bg-neutral-100 dark:!bg-gray-700"
                    name="return_date"
                    format="yyyy-MM-dd"
                  />
                </div>
              </div>

              <!-- Rooms and People -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ $t("dashboard.number_of_rooms") }}
                  </h3>
                  <InputsText
                    inputmode="numeric"
                    type="number"
                    name="number_of_rooms"
                    :placeholder="$t('dashboard.number_of_rooms')"
                    customClass="shadow-lg !bg-neutral-100 dark:!bg-gray-700"
                    icon="mdi-bed"
                  />
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ $t("dashboard.number_of_people") }}
                  </h3>
                  <InputsText
                    inputmode="numeric"
                    type="number"
                    name="number_of_people"
                    :placeholder="$t('dashboard.number_of_people')"
                    customClass="shadow-lg !bg-neutral-100 dark:!bg-gray-700"
                    icon="mdi-account"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-center mt-8">
              <button
                type="submit"
                class="bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Icon name="mdi:magnify" />
                {{ $t("search") }}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-8">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div class="flex flex-wrap items-center gap-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              تصفية النتائج:
            </h3>
            
            <!-- Price Range -->
            <select class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">نطاق السعر</option>
              <option value="budget">اقتصادي (أقل من 500 ريال)</option>
              <option value="mid">متوسط (500 - 1000 ريال)</option>
              <option value="luxury">فاخر (أكثر من 1000 ريال)</option>
            </select>

            <!-- Star Rating -->
            <select class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">تصنيف النجوم</option>
              <option value="3">3 نجوم فأكثر</option>
              <option value="4">4 نجوم فأكثر</option>
              <option value="5">5 نجوم</option>
            </select>

            <!-- Distance -->
            <select class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">المسافة من الحرم</option>
              <option value="walking">مشي (أقل من 500م)</option>
              <option value="close">قريب (500م - 1كم)</option>
              <option value="moderate">متوسط (1كم - 2كم)</option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">عرض:</span>
            <button
              @click="viewMode = 'grid'"
              :class="viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'"
              class="p-2 rounded-lg transition-colors duration-300"
            >
              <Icon name="mdi:view-grid" />
            </button>
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'"
              class="p-2 rounded-lg transition-colors duration-300"
            >
              <Icon name="mdi:view-list" />
            </button>
          </div>
        </div>

        <!-- Results Count -->
        <div class="mb-6">
          <p class="text-gray-600 dark:text-gray-400">
            تم العثور على <span class="font-semibold text-primary">{{ hotels.length }}</span> فندق
          </p>
        </div>

        <!-- Hotels Grid/List -->
        <div 
          :class="viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-6'"
        >
          <div
            v-for="hotel in hotels"
            :key="hotel.id"
            :class="viewMode === 'grid' ? 'hotel-card-grid' : 'hotel-card-list'"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <!-- Hotel Image -->
            <div :class="viewMode === 'grid' ? 'h-48' : 'w-80 h-full'" class="relative overflow-hidden">
              <NuxtImg
                :src="hotel.image"
                :alt="hotel.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              <!-- Rating Badge -->
              <div class="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Icon name="mdi:star" class="text-yellow-500 text-sm" />
                <span class="text-sm font-semibold text-gray-800 dark:text-white">{{ hotel.rating }}</span>
              </div>

              <!-- Favorite Button -->
              <button class="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300">
                <Icon name="mdi:heart-outline" class="text-gray-600 dark:text-gray-300 hover:text-red-500" />
              </button>
            </div>

            <!-- Hotel Info -->
            <div class="p-6 flex-1">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-primary transition-colors duration-300">
                    {{ hotel.name }}
                  </h3>
                  <div class="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                    <Icon name="mdi:map-marker" class="text-primary" />
                    <span>{{ hotel.location }}</span>
                  </div>
                </div>
                
                <div class="text-left">
                  <div class="text-2xl font-bold text-primary dark:text-primary-dark">
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
                <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                <button class="flex-1 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105">
                  <Icon name="mdi:calendar-check" />
                  {{ $t("hotels.book") }}
                </button>
                <button class="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                  <Icon name="mdi:information-outline" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-12">
          <button class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl">
            <Icon name="mdi:reload" />
            تحميل المزيد من الفنادق
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";

const viewMode = ref('grid');

// Sample hotel data
const hotels = ref([
  {
    id: 1,
    name: "فندق دار التوحيد إنتركونتيننتال",
    location: "مكة المكرمة - أبراج البيت",
    price: "1,200",
    rating: "4.8",
    distance: "50 متر من الحرم",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    features: ["إطلالة على الحرم", "مطعم حلال", "خدمة الغرف"]
  },
  {
    id: 2,
    name: "فندق الحرم - أوتوجراف كوليكشن",
    location: "مكة المكرمة - العزيزية",
    price: "800",
    rating: "4.6",
    distance: "200 متر من الحرم",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    features: ["مسبح", "سبا", "صالة رياضية"]
  },
  {
    id: 3,
    name: "فندق شذا المدينة",
    location: "المدينة المنورة - المنطقة المركزية",
    price: "600",
    rating: "4.5",
    distance: "300 متر من المسجد النبوي",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    features: ["إفطار مجاني", "موقف سيارات", "خدمة النقل"]
  },
  {
    id: 4,
    name: "فندق المروة ريحان من روتانا",
    location: "مكة المكرمة - المروة",
    price: "950",
    rating: "4.7",
    distance: "150 متر من الحرم",
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    features: ["إطلالة بانورامية", "مطعم فاخر", "خدمة كونسيرج"]
  },
  {
    id: 5,
    name: "فندق أنوار المدينة موفنبيك",
    location: "المدينة المنورة - النبوي الشريف",
    price: "750",
    rating: "4.4",
    distance: "400 متر من المسجد النبوي",
    image: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg",
    features: ["مركز أعمال", "قاعات اجتماعات", "خدمة غسيل"]
  },
  {
    id: 6,
    name: "فندق الإيمان طيبة",
    location: "المدينة المنورة - قباء",
    price: "450",
    rating: "4.2",
    distance: "1 كم من المسجد النبوي",
    image: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
    features: ["أسعار اقتصادية", "نظافة عالية", "خدمة ودودة"]
  }
]);

// SEO
useHead({
  title: "الفنادق - خطوات المعتمر",
  meta: [
    {
      name: "description",
      content: "اكتشف أفضل الفنادق في مكة المكرمة والمدينة المنورة مع خطوات المعتمر",
    },
  ],
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(-45deg, #865bea, #42045d, #306aad, #5beab2);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hotel-card-grid {
  @apply flex flex-col;
}

.hotel-card-list {
  @apply flex flex-row;
}

.container {
  max-width: 1200px;
}

/* Smooth transitions for all interactive elements */
button, select, .hotel-card-grid, .hotel-card-list {
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