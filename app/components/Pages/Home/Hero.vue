<template>
  <div class="h-dvh p-2 md:p-4">
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

      <div class="hero-content p-4 md:p-6 relative z-10 h-full w-full flex flex-col">
        <div
          class="flex-1 flex justify-center items-center flex-col text-white"
        >
          <h1 class="text-2xl md:text-4xl lg:text-5xl my-4 md:my-6 font-bold text-center px-4">
            {{ $t("home.subtitle") }}
          </h1>
          <p class="opacity-70 text-sm md:text-base lg:text-lg text-center max-w-2xl px-4">
            {{ $t("home.description") }}
          </p>
        </div>

        <GlobalHotelsFormSearch />
      </div>
    </div>
  </div>
</template>
