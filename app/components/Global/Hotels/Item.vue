<template>
	<NuxtLink
		:to="`/hotels/${hotel.id}`"
		class="block group h-[620px] relative border border-solid border-white/40 rounded-2xl overflow-hidden"
	>
		<div class="w-full h-full p-1 absolute bg-purple-400 dark:bg-purple-600">
			<div class="w-full h-full rounded-xl rounded-tr-[100px] rounded-br-[40px] bg-[#222]"></div>
		</div>

		<div
			class="w-full h-full flex items-center justify-center relative backdrop-blur-lg rounded-2xl"
		>
			<div
				class="w-32 absolute h-32 rounded-full bg-gradient-to-tr from-purple-500 dark:from-purple-800 to-orange-300 animate-spin"
				style="animation-duration: 12s"
			></div>
			<nuxt-img
				class="w-full h-full object-cover block relative group-hover:scale-105 rounded-lg transition-transform"
				:src="hotel.img"
			/>
		</div>

		<div class="w-full h-full p-2 flex flex-col gap-2 justify-between absolute inset-0">
			<div class="flex gap-2 justify-between">
				<div class="flex items-center justify-center">
					<span class="text-xs text-gray-400 flex items-center">
						<Icon
							name="ic:sharp-star-rate"
							v-for="n in hotel.rate"
							:key="n"
							class="text-yellow-500 text-3xl drop-shadow-lg shadow-black"
						/>
					</span>
				</div>

				<div
					class="p-2 flex gap-2 items-center flex-row-reverse backdrop-blur-lg bg-gray-500/70 rounded-md"
				>
					<span class="text-center text-blue-100 dark:text-blue-300">
						<Icon class="text-xl" name="material-symbols:location-on" />
					</span>
					<span class="text-xs leading-3 text-end">{{ hotel.location.city }}</span>
				</div>
			</div>

			<div
				class="transition-opacity px-3 py-4 flex justify-between rounded-lg shadow-lg backdrop-blur-lg bg-gray-700/30 text-gray-200 font-medium font-mono"
			>
				<h1 class="text-xl font-medium">{{ hotel.name }}</h1>

				<button
					@click="handleFavoriteClick"
					class="w-10 h-10 text-lg flex shadow-lg items-center m-2 justify-center rounded-full backdrop-blur-lg bg-gradient-to-tr from-purple-500/50 dark:from-purple-800/70 cursor-pointer transition-all duration-300 hover:bg-red-500/30"
					:class="{
						'text-red-500  to-red-800/60': is_fav,
						'to-orange-500/40 ': !is_fav,
					}"
				>
					<Transition name="fav">
						<Icon v-if="is_fav" name="solar:heart-bold" />
						<Icon v-else name="ic:sharp-favorite" />
					</Transition>
					<!-- <Icon class="font-serif text-white/80" /> -->
				</button>
			</div>
		</div>
	</NuxtLink>
</template>

<script lang="ts" setup>
import { useFavorites } from "#imports";
import type { IHotelResponse } from "~/types/hotel";

const props = defineProps<{ hotel: IHotelResponse }>();
const { toggleFavorite, isFavorite } = useFavorites();

const { t } = useI18n();

const is_fav = computed(() => isFavorite(props.hotel.id));

const handleFavoriteClick = (event: Event) => {
	event.preventDefault();
	event.stopPropagation();
	const added = toggleFavorite(props.hotel.id);
	if (added) useToast().success(t("favorites.added"));
	else useToast().info(t("favorites.removed"));
};
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
		background-image: radial-gradient(circle at 100% 0, transparent 70%, white 70%);
		box-shadow: 0em 0.5em 0 white, -0.5em 0em 0 white;
	}

	&::before {
		@apply left-auto right-0 -rotate-90;
	}
}
</style>
