<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
    <!-- Background Image -->
    <GlobalImageMask src="/logo/light.png" />

    <!-- Page Header -->
    <GlobalPageTitle
      :title="$t('about.title')"
      :subTitle="$t('about.subtitle')"
    />

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-16">
      <!-- About Introduction -->
      <section class="mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="bg-white dark:!bg-gray-800 rounded-3xl p-8 shadow-xl">
              <h2
                class="text-3xl font-bold text-primary dark:text-primary-dark mb-6"
              >
                {{ $t("about.who_we_are") }}
              </h2>
              <p
                class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
              >
                {{ $t("about.description") }}
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {{ $t("about.detailed_description") }}
              </p>

              <!-- Key Features -->
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <Icon
                      name="mdi:check-circle"
                      class="text-primary text-xl"
                    />
                  </div>
                  <span class="text-gray-700 dark:text-gray-300 font-medium">
                    {{ $t("about.features.experience") }}
                  </span>
                </div>
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <Icon
                      name="mdi:check-circle"
                      class="text-primary text-xl"
                    />
                  </div>
                  <span class="text-gray-700 dark:text-gray-300 font-medium">
                    {{ $t("about.features.team") }}
                  </span>
                </div>
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <Icon
                      name="mdi:check-circle"
                      class="text-primary text-xl"
                    />
                  </div>
                  <span class="text-gray-700 dark:text-gray-300 font-medium">
                    {{ $t("about.features.support") }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2">
            <div class="relative">
              <NuxtImg
                src="/logo/light-finger.png"
                alt="خدمات الحج والعمرة"
                class="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div
                class="absolute -bottom-6 -left-6 bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-xl"
              >
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary">15+</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    سنة خبرة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="mb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/20"
          >
            <div class="text-center mb-6">
              <div
                class="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Icon name="mdi:target" class="text-primary text-4xl" />
              </div>
              <h3 class="text-2xl font-bold text-primary mb-4">
                {{ $t("about.mission.title") }}
              </h3>
            </div>
            <p
              class="text-gray-700 dark:text-gray-300 text-center leading-relaxed"
            >
              {{ $t("about.mission.text") }}
            </p>
          </div>

          <div
            class="bg-gradient-to-br from-harmony1/5 to-harmony1/10 rounded-3xl p-8 border border-harmony1/20"
          >
            <div class="text-center mb-6">
              <div
                class="w-20 h-20 bg-harmony1/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Icon name="mdi:eye" class="text-harmony1 text-4xl" />
              </div>
              <h3 class="text-2xl font-bold text-harmony1 mb-4">
                {{ $t("about.vision.title") }}
              </h3>
            </div>
            <p
              class="text-gray-700 dark:text-gray-300 text-center leading-relaxed"
            >
              {{ $t("about.vision.text") }}
            </p>
          </div>
        </div>
      </section>

      <!-- Statistics -->
      <section class="mb-20">
        <div
          class="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-12 text-white"
        >
          <h2 class="text-3xl font-bold text-center mb-12">
            {{ $t("about.stats.title") }}
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-4xl font-bold mb-2">50K+</div>
              <div class="text-white/80">{{ $t("about.stats.clients") }}</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold mb-2">200+</div>
              <div class="text-white/80">{{ $t("about.stats.hotels") }}</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold mb-2">500+</div>
              <div class="text-white/80">{{ $t("about.stats.vehicles") }}</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold mb-2">4.9</div>
              <div class="text-white/80">{{ $t("about.stats.rating") }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Services -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {{ $t("about.services.title") }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ $t("about.services.description") }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white dark:!bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div
              class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
            >
              <Icon name="ri:hotel-bed-fill" class="text-primary text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {{ $t("about.services.hotels.title") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ $t("about.services.hotels.description") }}
            </p>
          </div>

          <div
            class="bg-white dark:!bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div
              class="w-16 h-16 bg-harmony1/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
            >
              <Icon name="mdi:car-multiple" class="text-harmony1 text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {{ $t("about.services.transport.title") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ $t("about.services.transport.description") }}
            </p>
          </div>

          <div
            class="bg-white dark:!bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div
              class="w-16 h-16 bg-harmony2/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
            >
              <Icon name="mdi:account-group" class="text-harmony2 text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {{ $t("about.services.guidance.title") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ $t("about.services.guidance.description") }}
            </p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {{ $t("about.team.title") }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ $t("about.team.description") }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg text-center group hover:shadow-xl transition-all duration-300"
          >
            <div
              class="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <Icon name="mdi:account" class="text-white text-3xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              أحمد محمد
            </h3>
            <p class="text-primary font-medium mb-3">مدير العمليات</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              خبرة 12 سنة في إدارة رحلات الحج والعمرة
            </p>
          </div>

          <div
            class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg text-center group hover:shadow-xl transition-all duration-300"
          >
            <div
              class="w-24 h-24 bg-gradient-to-br from-harmony1 to-harmony1/80 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <Icon name="mdi:account" class="text-white text-3xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              فاطمة علي
            </h3>
            <p class="text-harmony1 font-medium mb-3">مديرة خدمة العملاء</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              متخصصة في تقديم الدعم والمساعدة للحجاج
            </p>
          </div>

          <div
            class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg text-center group hover:shadow-xl transition-all duration-300"
          >
            <div
              class="w-24 h-24 bg-gradient-to-br from-harmony2 to-harmony2/80 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <Icon name="mdi:account" class="text-white text-3xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              محمد السعيد
            </h3>
            <p class="text-harmony2 font-medium mb-3">مدير المبيعات</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              خبير في تصميم البرامج السياحية الدينية
            </p>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="text-center">
        <div
          class="bg-gradient-to-r from-primary/10 to-harmony1/10 rounded-3xl p-12 border border-primary/20"
        >
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {{ $t("about.cta.title") }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {{ $t("about.cta.description") }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {{ $t("about.cta.contact") }}
            </NuxtLink>
            <NuxtLink
              to="/hotels"
              class="bg-white dark:bg-gray-800 border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {{ $t("about.cta.explore") }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
usePageTitle("about.title");

useHead({
  meta: [
    {
      name: "description",
      content:
        "تعرف على حجوزات المعتمر، الشركة الرائدة في خدمات الحج والعمرة مع خبرة تزيد عن 15 سنة في خدمة ضيوف الرحمن",
    },
    {
      name: "keywords",
      content:
        "حجوزات المعتمر, الحج, العمرة, فنادق مكة, فنادق المدينة, خدمات الحجاج",
    },
  ],
});
</script>

<style scoped>
.line-height-relaxed {
  line-height: 1.8;
}
</style>
