<template>
  <NuxtLink
    :to="`/hotels/${hotel.id}`"
    class="flex flex-col relative shadow group rounded-xl h-full overflow-hidden bg-white *:!transition-all border-white border-8 "
  >
    <NuxtImg
      :src="hotel.img || '/logo/vertical.png'"
      class="object-cover w-full h-full absolute inset-0 "
    />

    <div class="block rounded-3xlrelative">
      <NuxtImg
        :src="hotel.img || '/logo/vertical.png'"
        class="object-cover w-full h-full opacity-0 "
      />
    </div>

    <div
      class="relative transition-all translate-y-full group-hover:translate-y-0 bg-white backdrop-blur-sm custume-br"
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
    id: string | number
    img?: string
  }
}>()
</script>

<style scoped lang="scss">
.custume-br {

  &::before,
  &::after {
    content: '';
    @apply absolute bottom-full aspect-square w-4 left-0 right-auto;
    background-image: radial-gradient(circle at 100% 0, transparent 70%, white 70%);
    box-shadow :
     0em .5em 0 white,
     -.5em 0em 0 white,
  }

  &::before {
    @apply left-auto right-0 -rotate-90;
  }
}
</style>
