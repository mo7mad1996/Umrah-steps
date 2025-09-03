<template>
  <div class="h-dvh p-4">
    <div class="relative h-full">
      <div
        class="absolute inset-0 overflow-hidden rounded-3xl after:bg-black/30 after:absolute after:inset-0 after:z-0 h-full"
      >
        <NuxtImg
          alt="hotel"
          src="/images/hotel.jpg"
          class="block w-full h-full object-cover"
        />
      </div>

      <div class="hero-content p-4 relative z-10 h-full w-full flex flex-col">
        <div
          class="flex-1 flex justify-center items-center flex-col text-white"
        >
          <h1 class="text-4xl my-6 font-bold">{{ $t("home.subtitle") }}</h1>
          <p class="opacity-70">{{ $t("home.description") }}</p>
        </div>

        <GlobalHotelsFormSearch />
      </div>
    </div>
  </div>
</template>
