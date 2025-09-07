<template>
  <NuxtLink
    :to="`/hotels/${hotel.id}`"
    class="flex flex-col relative shadow group rounded-xl h-full overflow-hidden bg-white *:!transition-all "
  >
    <NuxtImg
      :src="hotel.img || '/logo/vertical.png'"
      class="object-cover w-full h-full absolute inset-0"
    />
    <div
      class="block rounded-3xl  group-hover:p-8  border-white bg-gray-300 relative"
    >
      <NuxtImg
        :src="hotel.img || '/logo/vertical.png'"
        class="object-cover w-full h-full opacity-0 "
      />
    </div>

    <div
      class="relative transition-all translate-y-full group-hover:translate-y-0 bg-gray-400"
    >
      <p class="p-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ipsum
        eligendi veniam eaque velit quia repellat voluptatibus earum eius
        ratione dicta corrupti doloribus aut quam aperiam molestiae, voluptas
        minus ipsam!
      </p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
  hotel: {
    id:string | number
    img?: string
  }
}>()
</script>
