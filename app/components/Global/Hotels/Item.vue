<template>
  <NuxtLink
    :to="`/hotels/${hotel.id}`"
    class="flex flex-col relative shadow group rounded-xl h-full overflow-hidden bg-white *:!transition-all border-white border-8"
  >
    <NuxtImg
      :src="hotel.img || '/logo/vertical.png'"
      class="object-cover w-full h-full absolute inset-0"
    />

    <div class="block rounded-3xl relative">
      <div
        class="flex justify-between items-center py-3 px-5 text-2xl"
        @click.prevent
      >
        <div class="flex items-center gap-2">
          <button
            class="aspect-square w-9 rounded-full backdrop-blur-md flex items-center justify-center transition"
            :class="{
              'text-red-400 hover:bg-red-200/50': is_fav,
              'text-primary hover:bg-emerald-100/50': !is_fav,
            }"
            @click="is_fav = !is_fav"
          >
            <Transition name="fav">
              <Icon v-if="is_fav" name="solar:heart-bold" />
              <Icon v-else name="material-symbols:favorite-outline-rounded" />
            </Transition>
          </button>
        </div>
        <div>
          <div class="flex gap-2">
            <Icon name="material-symbols-light:location-on" />

            <span>{{ hotel.location.city }}</span>
          </div>
          <div class="flex gap-0">
            <Icon
              class=""
              name="ic:baseline-star-border"
              v-for="i in hotel.rate"
              :key="i"
            />
          </div>
        </div>
      </div>

      <NuxtImg
        :src="hotel.img || '/logo/vertical.png'"
        class="object-cover w-full h-full opacity-0"
      />
    </div>

    <div
      class="relative transition-all translate-y-full group-hover:translate-y-0 bg-white backdrop-blur-sm custume-br"
    >
      <h3 v-if="hotel.name">{{ hotel.name }}</h3>
      <p class="p-8" v-if="hotel.description">{{ hotel.description }}</p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Hotel } from "~/types/Hotel";

const props = defineProps<{
  hotel: Hotel;
}>();

const is_fav = computed({
  set(v: boolean) {
    if (v) favorites.value.unshift(props.hotel.id);
    else favorites.value = favorites.value.filter((i) => (i = !props.hotel.id));
  },

  get() {
    return favorites.value.includes(props.hotel.id);
  },
});
const favorites = useCookie<any[]>("favourite", {
  default() {
    return [];
  },
});
</script>

<style scoped lang="scss">
.fav-enter-active,
.fav-leave-active {
  transition: 0.3s ease;
  transition-timing-function: cubic-bezier(0.09, 0.4, 0, 1.91);

  @apply h-full absolute;
}

.fav-enter-from {
  @apply scale-50;
}
.fav-leave-to {
  @apply opacity-0;
}

.custume-br {
  &::before,
  &::after {
    content: "";

    @apply absolute bottom-full aspect-square w-4 left-0 right-auto;
    background-image: radial-gradient(
      circle at 100% 0,
      transparent 70%,
      white 70%
    );
    box-shadow: 0em 0.5em 0 white, -0.5em 0em 0 white;
  }

  &::before {
    @apply left-auto right-0 -rotate-90;
  }
}
</style>
