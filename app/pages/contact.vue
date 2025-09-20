<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
    <!-- Background Image -->
    <GlobalImageMask src="/images/hotel.jpg" />

    <!-- Page Header -->
    <GlobalPageTitle
      :title="$t('contact.title')"
      :subTitle="$t('contact.subtitle')"
    />

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-16">
      <!-- Contact Methods -->
      <LazyPagesContactMethods />

      <!-- Contact Form & Info -->
      <section class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact Form -->
          <LazyPagesContactForm />

          <!-- Contact Information -->
          <div class="space-y-6">
            <!-- Office Hours -->
            <div class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3
                class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3"
              >
                <Icon name="mdi:clock" class="text-primary" />
                {{ $t("contact.info.hours") }}
              </h3>
              <div class="space-y-3 text-gray-600 dark:text-gray-400">
                <div class="flex justify-between">
                  <span>السبت - الخميس</span>
                  <span>8:00 ص - 10:00 م</span>
                </div>
                <div class="flex justify-between">
                  <span>الجمعة</span>
                  <span>2:00 م - 10:00 م</span>
                </div>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {{ $t("contact.quick_links.title") }}
              </h3>

              <div class="space-y-3">
                <NuxtLink
                  to="/hotels"
                  class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="ri:hotel-bed-fill" />
                  {{ $t("nav.hotels") }}
                </NuxtLink>
                <NuxtLink
                  to="/about"
                  class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="mdi:information" />
                  {{ $t("nav.about") }}
                </NuxtLink>
                <a
                  href="tel:+966123456789"
                  class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="mdi:phone" />
                  اتصال طارئ
                </a>
              </div>
            </div>

            <!-- Social Media -->
            <div class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {{ $t("contact.social.title") }}
              </h3>
              <div class="flex gap-3">
                <a
                  href="#"
                  class="w-12 h-12 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon name="mdi:whatsapp" class="text-xl" />
                </a>
                <a
                  href="#"
                  class="w-12 h-12 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon name="mdi:facebook" class="text-xl" />
                </a>
                <a
                  href="#"
                  class="w-12 h-12 bg-sky-500/10 hover:bg-sky-500 text-sky-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon name="mdi:twitter" class="text-xl" />
                </a>
                <a
                  href="#"
                  class="w-12 h-12 bg-pink-500/10 hover:bg-pink-500 text-pink-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon name="mdi:instagram" class="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <LazyPagesContactFaqs />

      <!-- Map Section -->
      <GlobalMap />
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
usePageTitle("contact.title");

// useHead({
//   meta: [
//     {
//       name: "description",
//       content:
//         "تواصل مع حجوزات المعتمر للحصول على أفضل خدمات الحج والعمرة. نحن هنا لخدمتكم على مدار الساعة",
//     },
//     {
//       name: "keywords",
//       content:
//         "اتصل بنا, حجوزات المعتمر, خدمة العملاء, الحج, العمرة, مكة المكرمة",
//     },
//   ],
// });
</script>

<style lang="scss">
.between-lines {
  @apply flex gap-6 md:gap-12 items-center;

  &::after,
  &::before {
    content: "";
    @apply flex-1 h-px bg-gray-500 block;
  }
}
</style>
