<template>
  <div class="overflow-hidden rounded-2xl">
    <NuxtImg
      class="object-cover w-full h-full"
      src="https://levels.io/content/images/2022/09/CleanShot-2022-09-18-at-14.44.52@2x.png"
    />

    <div class="p-4 absolute inset-0">
      <div class="flex flex-col justify-between h-full">
        <div
          class="bg-white/20 flex items-end backdrop-blur-md text-white w-fit p-2 rounded-full relative"
        >
          <Icon name="famicons:heart" class="text-3xl text-red-600" />
          <span class="text-sm abs">
            {{ (5).toFixed(1) }}
          </span>
        </div>
        <div
          class="bg-white/20 backdrop-blur-md text-white p-2 leading-relaxed rounded-lg line-clamp-4"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
          tempore cumque illo nulla voluptates dolores non debitis, eum nostrum
          laboriosam dolore ipsa rem vero illum provident voluptatum. Ullam, nam
          tempore?
        </div>
      </div>
    </div>
  </div>
</template>
