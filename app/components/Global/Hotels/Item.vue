<template>
	<NuxtLink
		:to="`/hotels/${hotel.id}`"
		class="flex flex-col relative shadow group rounded-xl h-full min-h-[300px] md:min-h-[400px] overflow-hidden bg-white *:!transition-all border-white border-4 md:border-8 hover:shadow-xl transition-all duration-300"
	>
		<NuxtImg
			:src="hotel.img || '/logo/vertical.png'"
			class="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-500"
		/>

		<div class="block rounded-3xl relative flex-1">
			<div
				class="flex justify-between items-center py-2 md:py-3 px-3 md:px-5 text-lg md:text-2xl"
				@click.prevent
			>
				<div class="flex items-center gap-2">
					<button
						class="aspect-square w-8 md:w-9 rounded-full backdrop-blur-md flex items-center justify-center transition hover:scale-110"
						:class="{
							'text-red-400 hover:bg-red-200/50': is_fav,
							'text-primary hover:bg-emerald-100/50': !is_fav,
						}"
						@click="handleFavoriteClick"
					>
						<Transition name="fav">
							<Icon v-if="is_fav" name="solar:heart-bold" />
							<Icon v-else name="material-symbols:favorite-outline-rounded" />
						</Transition>
					</button>
				</div>
				<div>
					<div class="flex gap-1 md:gap-2 items-center text-sm md:text-base">
						<Icon name="material-symbols-light:location-on" />

						<span>{{ hotel.location.city }}</span>
					</div>
					<div class="flex gap-0 justify-end">
						<Icon
							class="text-yellow-400 text-sm md:text-base"
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
			class="relative transition-all translate-y-full group-hover:translate-y-0 bg-white/95 backdrop-blur-sm custume-br p-4 md:p-6"
		>
			<h3 v-if="hotel.name" class="text-lg md:text-xl font-semibold mb-2">{{ hotel.name }}</h3>
			<p class="opacity-70 text-sm md:text-base line-clamp-3" v-if="hotel.description">
				{{ hotel.description }}
			</p>
		</div>
	</NuxtLink>
</template>

<script lang="ts" setup>
import type { IHotelResponse } from "~/types/hotel";

const props = defineProps<{ hotel: IHotelResponse }>();
const { toggleFavorite, isFavorite } = useFavorites();
const { showToast } = useToast();
const { t } = useI18n();

const is_fav = computed(() => isFavorite(props.hotel.id));

const handleFavoriteClick = (event: Event) => {
	event.preventDefault();
	event.stopPropagation();
	const added = toggleFavorite(props.hotel.id);
	if (added) {
		showToast(t('favorites.added'), 'success');
	} else {
		showToast(t('favorites.removed'), 'info');
	}
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
