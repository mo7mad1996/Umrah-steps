<template>
  <section>
    <div class="bg-white dark:!bg-gray-800 rounded-3xl p-8 shadow-xl">
      <h2
        class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center"
      >
        {{ $t("contact.map.title") }}
      </h2>
      <div
        class="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center"
      >
        <div class="text-center text-gray-500 dark:text-gray-400">
          <Icon name="mdi:map" class="text-6xl mb-4" />
          <p>{{ $t("contact.map.placeholder") }}</p>
          <p class="text-sm mt-2">مكة المكرمة - حي العزيزية</p>
        </div>
      </div>
    </div>
  </section>
</template>
