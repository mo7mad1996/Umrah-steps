<template>
	<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative">
		<!-- background -->
		<GlobalImageMask src="/images/hotel2.jpeg" />

		<!-- Page Header -->
		<GlobalPageTitle :title="$t('hotels.title')" :subTitle="$t('hotels.subtitle')" />

		<!-- Search Form Section -->
		<div class="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
			<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
				<GlobalHotelsFormSearch />
			</div>
		</div>

		<section class="py-8 md:py-12">
			<div class="container mx-auto px-4 md:px-6">
				<!-- Filters Section -->
				<PagesHotelsFilters :filters="filters" />

				<!-- Results Count -->
				<div class="mb-6 md:mb-8">
					<div
						class="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
					>
						<p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
							تم العثور على
							<span class="font-bold text-emerald-600 dark:text-emerald-400 text-lg mx-1">{{
								filteredHotels.length
							}}</span>
							فندق
						</p>
						<div class="flex gap-2">
							<button
								@click="filters.viewMode = 'grid'"
								:class="[
									'p-2 rounded-lg transition-all',
									filters.viewMode === 'grid'
										? 'bg-emerald-600 text-white shadow-md'
										: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600',
								]"
							>
								<Icon name="mdi:view-grid" class="text-xl" />
							</button>
							<button
								@click="filters.viewMode = 'list'"
								:class="[
									'p-2 rounded-lg transition-all',
									filters.viewMode === 'list'
										? 'bg-emerald-600 text-white shadow-md'
										: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600',
								]"
							>
								<Icon name="mdi:view-list" class="text-xl" />
							</button>
						</div>
					</div>
				</div>

				<!-- Hotels Grid/List -->
				<div
					v-if="status === 'success' && filteredHotels.length > 0"
					:class="{
						'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6':
							filters.viewMode === 'grid',
						'space-y-4 md:space-y-6': filters.viewMode === 'list',
					}"
				>
					<div
						v-for="hotel in paginatedHotels"
						:key="hotel.id"
						:class="filters.viewMode === 'grid' ? 'hotel-card-grid' : 'hotel-card-list'"
					>
						<GlobalHotelsItem :hotel="hotel" />
					</div>
				</div>

				<!-- Loading State -->
				<div
					v-if="status === 'pending'"
					class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
				>
					<div
						v-for="i in 8"
						:key="i"
						class="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 md:h-80 animate-pulse"
					></div>
				</div>

				<!-- No Results -->
				<div v-if="status === 'success' && filteredHotels.length === 0" class="text-center py-12">
					<div class="text-gray-400 mb-4">
						<Icon name="mdi:hotel-off" class="text-6xl" />
					</div>
					<h3 class="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">لا توجد فنادق</h3>
					<p class="text-gray-500 dark:text-gray-500">جرب تغيير معايير البحث</p>
				</div>

				<!-- Load More Button -->
				<div
					v-if="status === 'success' && filteredHotels.length > 0 && hasMoreResults"
					class="text-center mt-10 md:mt-14"
				>
					<button
						@click="loadMore"
						:disabled="loading"
						class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium px-8 md:px-10 py-3 md:py-4 rounded-full transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
					>
						<Icon
							name="mdi:reload"
							:class="{ 'animate-spin': loading }"
							class="text-xl"
						/>
						<span class="text-sm md:text-base">
							{{ loading ? "جاري التحميل..." : "تحميل المزيد من الفنادق" }}
						</span>
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { Hotel } from "~/types/hotel";

// Reactive data
const filters = reactive<{
	price: [number, number];
	rate: [number, number];
	distance: [number, number];
	viewMode: "list" | "grid";
	search: string;
}>({
	price: [0, Infinity],
	rate: [0, 5],
	distance: [0, Infinity],
	viewMode: "grid" as "list" | "grid",
	search: "",
});

const page = ref(1);
const itemsPerPage = 12;
const displayedItems = ref(itemsPerPage);
const loading = ref(false);

// Fetch hotels data
const { data: hotels, status, error, refresh, per_page: hotelPerPage } = useHotels();
hotelPerPage.value = 100; // Fetch more items for client-side filtering

// Computed properties
const filteredHotels = computed(() => {
	if (!hotels.value) return [];

	return hotels.value.filter((hotel: Hotel) => {
		// Price filter
		const price = 500; // Mock price - you should add price to hotel data
		const priceMatch = price >= filters.price[0] && price <= filters.price[1];

		// Rating filter
		const ratingMatch = hotel.rate >= filters.rate[0] && hotel.rate <= filters.rate[1];

		// Distance filter (mock implementation)
		const distance = 800; // Mock distance - you should add distance to hotel data
		const distanceMatch = distance >= filters.distance[0] && distance <= filters.distance[1];

		// Search filter
		const searchMatch =
			!filters.search ||
			hotel.name.toLowerCase().includes(filters.search.toLowerCase()) ||
			hotel.description.toLowerCase().includes(filters.search.toLowerCase()) ||
			hotel.location.city.toLowerCase().includes(filters.search.toLowerCase());

		return priceMatch && ratingMatch && distanceMatch && searchMatch;
	});
});

const paginatedHotels = computed(() => {
	return filteredHotels.value.slice(0, displayedItems.value);
});

const hasMoreResults = computed(() => {
	return displayedItems.value < filteredHotels.value.length;
});

// Methods
const loadMore = () => {
	loading.value = true;
	setTimeout(() => {
		displayedItems.value += itemsPerPage;
		loading.value = false;
	}, 500);
};

// Watch for filter changes to reset pagination
watch(
	filters,
	() => {
		displayedItems.value = itemsPerPage;
	},
	{ deep: true },
);

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
