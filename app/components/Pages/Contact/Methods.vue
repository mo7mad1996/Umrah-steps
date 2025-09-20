<template>
  <section class="mb-16">
    <div class="mb-12 between-lines">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {{ $t("contact.methods.title") }}
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Phone -->
      <div
        class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
      >
        <div
          class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
        >
          <Icon name="mdi:phone" class="text-primary text-2xl" />
        </div>
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
          {{ $t("contact.info.phone") }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
          اتصل بنا مباشرة
        </p>
        <a
          href="tel:+966123456789"
          class="text-primary hover:text-primary/80 font-medium"
          dir="ltr"
        >
          +966 12 345 6789
        </a>
      </div>

      <!-- WhatsApp -->
      <div
        class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
      >
        <div
          class="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
        >
          <Icon name="mdi:whatsapp" class="text-green-500 text-2xl" />
        </div>
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
          واتساب
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
          تواصل سريع ومباشر
        </p>
        <a
          href="https://wa.me/966551234567"
          class="text-green-500 hover:text-green-500/80 font-medium"
          dir="ltr"
        >
          +966 55 123 4567
        </a>
      </div>

      <!-- Email -->
      <div
        class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
      >
        <div
          class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
        >
          <Icon name="mdi:email" class="text-blue-500 text-2xl" />
        </div>
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
          {{ $t("contact.info.email") }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
          راسلنا إلكترونياً
        </p>
        <a
          href="mailto:info@khatwat-almutamir.com"
          class="text-blue-500 hover:text-blue-500/80 font-medium text-sm"
        >
          info@khatwat-almutamir.com
        </a>
      </div>

      <!-- Location -->
      <div
        class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
      >
        <div
          class="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
        >
          <Icon name="mdi:map-marker" class="text-red-500 text-2xl" />
        </div>
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
          {{ $t("contact.info.address") }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
          زورنا في مكتبنا
        </p>
        <p class="text-red-500 font-medium text-sm">مكة المكرمة - العزيزية</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: config } = useSite();

console.log(config);
</script>
