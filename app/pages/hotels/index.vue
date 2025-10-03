<template>
	<div
		class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative"
	>
		<GlobalImageMask src="/images/hotel2.jpeg" />
		<GlobalPageTitle :title="$t('hotels.title')" :subTitle="$t('hotels.subtitle')" />

		<div class="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
			<!-- Search Form Section -->
			<GlobalHotelsFormSearch />
		</div>

		<section class="py-8 md:py-12 container mx-auto px-4 md:px-6">
			<!-- Filters Section -->
			<PagesHotelsFilters :filters="filters" />

			<!-- Results Count -->
			<p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
				{{ $t("hotels.got") }}
				<span class="font-bold text-emerald-600 dark:text-emerald-400 text-lg mx-1">
					{{ count }}
				</span>
				{{ $t("hotels.hotels") }}
			</p>

			<div :class="filters.viewMode === 'grid' ? 'hotel-card-grid' : 'hotel-card-list'">
				<GlobalHotelsItem :hotel="hotel" v-for="hotel in hotels" :key="hotel.id" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useHotels, usePageTitle } from "#imports";

// Reactive data
const filters = reactive({
	price: [0, Infinity],
	rate: [0, 5],
	distance: [0, Infinity],
	viewMode: "grid" as "list" | "grid",
	search: "",
});

// Fetch hotels data
const { data: hotels, status, error, refresh, page, count, finished } = useHotels();

// SEO
usePageTitle("hotels.title");
</script>

<style scoped>
.hotel-card-grid {
	@apply flex flex-col;
}

.hotel-card-list {
	@apply flex flex-col sm:flex-row;
}

/* Smooth transitions for all interactive elements */
button,
select,
.hotel-card-grid,
.hotel-card-list {
	transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.hotel-card-list {
		@apply flex-col space-y-4;
	}

	.hotel-card-list .w-80 {
		@apply w-full h-48;
	}
}
</style>
