<template>
  <footer
    class="bg-gradient-to-br from-primary to-primary-dark text-white dark:!from-primary-dark dark:!to-amber-950"
  >
    <!-- Main Footer Content -->
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <div class="mb-6">
            <NuxtImg
              src="/logo/horizontal.png"
              height="60"
              :alt="$t('site_name')"
              class="mb-4"
            />
            <p class="text-white/80 leading-relaxed">
              {{ $t("footer.description") }}
            </p>
          </div>

          <!-- Social Links -->
          <div class="flex gap-3">
            <a
              href="#"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Icon name="mdi:whatsapp" class="text-xl" />
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Icon name="mdi:facebook" class="text-xl" />
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Icon name="mdi:twitter" class="text-xl" />
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Icon name="mdi:instagram" class="text-xl" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-6 text-white">
            {{ $t("nav.home") }}
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <Icon
                  name="mdi:chevron-left"
                  class="text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
                />
                {{ $t("nav.home") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/hotels"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <Icon
                  name="mdi:chevron-left"
                  class="text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
                />
                {{ $t("nav.hotels") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <Icon
                  name="mdi:chevron-left"
                  class="text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
                />
                {{ $t("nav.about") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <Icon
                  name="mdi:chevron-left"
                  class="text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
                />
                {{ $t("nav.contact") }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-xl font-bold mb-6 text-white">
            {{ $t("nav.services") }}
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <Icon
                  name="mdi:chevron-left"
                  class="text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
                />
                حجز الفنادق
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <Icon
                  name="mdi:chevron-left"
                  class="text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
                />
                خدمات النقل
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <Icon
                  name="mdi:chevron-left"
                  class="text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
                />
                برامج الحج
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <Icon
                  name="mdi:chevron-left"
                  class="text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
                />
                برامج العمرة
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-xl font-bold mb-6 text-white">
            {{ $t("contact.title") }}
          </h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <Icon
                name="mdi:map-marker"
                class="text-secondary mt-1 flex-shrink-0"
              />
              <div class="text-white/80 text-sm leading-relaxed">
                المملكة العربية السعودية<br />
                مكة المكرمة - حي العزيزية
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Icon name="mdi:phone" class="text-secondary flex-shrink-0" />
              <div class="text-white/80 text-sm" dir="ltr">
                +966 12 345 6789
              </div>
            </div>

            <div class="flex items-center gap-3">
              <Icon name="mdi:email" class="text-secondary flex-shrink-0" />
              <div class="text-white/80 text-sm">
                info@khatwat-almutamir.com
              </div>
            </div>

            <div class="flex items-start gap-3">
              <Icon
                name="mdi:clock"
                class="text-secondary mt-1 flex-shrink-0"
              />
              <div class="text-white/80 text-sm leading-relaxed">
                السبت - الخميس: 8:00 ص - 10:00 م<br />
                الجمعة: 2:00 م - 10:00 م
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="border-t border-white/10">
      <div class="container mx-auto px-6 py-8">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div class="text-center md:text-right">
            <h3 class="text-lg font-bold mb-2">اشترك في النشرة الإخبارية</h3>
            <p class="text-white/80 text-sm">احصل على أحدث العروض والأخبار</p>
          </div>

          <div class="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              class="flex-1 md:w-64 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <button
              class="px-6 py-2 bg-secondary hover:bg-secondary/90 rounded-full font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <Icon name="mdi:send" />
              اشتراك
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10 bg-black/20">
      <div class="container mx-auto px-6 py-6">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div class="text-white/80 text-sm text-center md:text-right">
            © {{ new Date().getFullYear() }} {{ $t("site_name") }}.
            {{ $t("footer.rights") }}
          </div>

          <div class="flex items-center gap-6 text-sm">
            <a
              href="#"
              class="text-white/80 hover:text-white transition-colors duration-300"
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              class="text-white/80 hover:text-white transition-colors duration-300"
            >
              الشروط والأحكام
            </a>
            <a
              href="#"
              class="text-white/80 hover:text-white transition-colors duration-300"
            >
              اتفاقية الاستخدام
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Back to Top Button -->
    <button
      @click="scrollToTop"
      v-show="showBackToTop"
      class="fixed bottom-6 ltr:right-6 rtl:left-6 w-12 h-12 bg-secondary hover:bg-secondary/90 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
    >
      <Icon name="mdi:chevron-up" class="text-xl text-white" />
    </button>
  </footer>
</template>

<script setup>
const showBackToTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
