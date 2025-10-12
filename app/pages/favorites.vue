<template>
	<div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
		<!-- Dynamic Background Image -->
		<GlobalImageMask :src="pageContent?.content?.image || '/logo/light.png'" />

		<!-- Page Header -->
		<GlobalPageTitle :title="$t('favorites.title')" :subTitle="$t('favorites.subtitle')" />

		<!-- Main Content -->
		<div class="container mx-auto px-6 py-16">
			<!-- Loading State -->
			<div v-if="loading" class="flex justify-center py-20">
				<div class="relative">
					<div class="w-20 h-20 rounded-full border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 dark:border-t-purple-400 animate-spin"></div>
					<Icon name="solar:heart-bold" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-purple-600 dark:text-purple-400 animate-pulse" />
				</div>
			</div>

			<!-- Empty State -->
			<div v-else-if="favoriteHotels.length === 0" class="py-20">
				<div class="max-w-2xl mx-auto text-center">
					<div class="relative inline-block mb-8">
						<div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20"></div>
						<div class="relative p-12 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700">
							<Icon name="solar:heart-broken-bold" class="text-8xl text-purple-600 dark:text-purple-400" />
						</div>
					</div>

					<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
						{{ $t('favorites.empty') }}
					</h2>
					<p class="text-gray-600 dark:text-gray-400 text-lg mb-8">
						{{ $t('favorites.empty_description') }}
					</p>

					<NuxtLink
						to="/hotels"
						class="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
					>
						<Icon name="solar:magnifer-bold" class="text-2xl" />
						{{ $t('favorites.browse_hotels') }}
					</NuxtLink>
				</div>
			</div>

			<!-- Hotels Grid -->
			<div v-else>
				<!-- Summary Stats -->
				<section class="mb-12">
					<div class="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-12 text-white">
						<h2 class="text-3xl font-bold text-center mb-12">
							{{ $t("favorites.stats.title") }}
						</h2>
						<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
							<div class="text-center">
								<Icon name="solar:buildings-2-bold" class="text-5xl mb-3 mx-auto" />
								<div class="text-4xl font-bold mb-2">{{ favoriteHotels.length }}</div>
								<div class="text-white/80">{{ $t('favorites.stats.total_hotels') }}</div>
							</div>
							<div class="text-center">
								<Icon name="solar:wallet-money-bold" class="text-5xl mb-3 mx-auto" />
								<div class="text-4xl font-bold mb-2">
									{{ new Intl.NumberFormat(`${locale}-SA`, { style: "currency", currency: "SAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalValue) }}
								</div>
								<div class="text-white/80">{{ $t('favorites.stats.total_value') }}</div>
							</div>
							<div class="text-center">
								<Icon name="solar:wallet-money-bold" class="text-5xl mb-3 mx-auto" />
								<div class="text-4xl font-bold mb-2">
									{{ new Intl.NumberFormat(`${locale}-SA`, { style: "currency", currency: "SAR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(averagePrice) }}
								</div>
								<div class="text-white/80">{{ $t('favorites.stats.avg_price') }}</div>
							</div>
							<div class="text-center">
								<Icon name="solar:star-bold" class="text-5xl mb-3 mx-auto" />
								<div class="text-4xl font-bold mb-2">{{ averageRating.toFixed(1) }}</div>
								<div class="text-white/80">{{ $t('favorites.stats.avg_rating') }}</div>
							</div>
						</div>
					</div>
				</section>

				<!-- Hotels Section -->
				<section class="mb-12">
					<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
						<div>
							<h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
								{{ $t('favorites.my_hotels') }}
							</h2>
							<p class="text-gray-600 dark:text-gray-400">
								{{ $t('favorites.showing') }} {{ favoriteHotels.length }} {{ $t('favorites.hotels_count') }}
							</p>
						</div>

						<button
							@click="confirmClearDialog = true"
							class="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-700/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:scale-105 shadow-lg"
						>
							<Icon name="solar:trash-bin-trash-bold" class="text-xl" />
							{{ $t('favorites.clear_all') }}
						</button>
					</div>

					<!-- Hotels Grid with Animation -->
					<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						<div
							v-for="(hotel, index) in favoriteHotels"
							:key="hotel.id"
							class="animate-fadeIn"
							:style="{ animationDelay: `${index * 50}ms` }"
						>
							<GlobalHotelsItem :hotel="hotel" />
						</div>
					</div>
				</section>

				<!-- Call to Action -->
				<section class="text-center">
					<div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-12 border border-purple-200 dark:border-purple-700">
						<h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
							{{ $t("favorites.cta.title") }}
						</h2>
						<p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
							{{ $t("favorites.cta.description") }}
						</p>
						<NuxtLink
							to="/hotels"
							class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
						>
							<Icon name="solar:magnifer-bold" class="text-xl" />
							{{ $t("favorites.cta.explore") }}
						</NuxtLink>
					</div>
				</section>
			</div>
		</div>

		<!-- Confirm Dialog -->
		<v-dialog v-model="confirmClearDialog" max-width="500">
			<div class="rounded-3xl backdrop-blur-xl bg-white dark:bg-gray-900 p-8 shadow-2xl">
				<div class="flex items-center justify-center mb-6">
					<div class="p-4 rounded-full bg-red-100 dark:bg-red-900/30">
						<Icon name="solar:danger-bold" class="text-4xl text-red-600 dark:text-red-400" />
					</div>
				</div>

				<h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-3">
					{{ $t('favorites.confirm_clear') }}
				</h3>
				<p class="text-center text-gray-600 dark:text-gray-400 mb-8">
					{{ $t('favorites.confirm_clear_message') }}
				</p>

				<div class="flex gap-3">
					<button
						@click="confirmClearDialog = false"
						class="flex-1 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
					>
						{{ $t('global.cancel') }}
					</button>
					<button
						@click="handleClearAll"
						class="flex-1 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-red-700 hover:to-red-800 transition-all"
					>
						{{ $t('global.delete') }}
					</button>
				</div>
			</div>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'default',
});

const { t, locale } = useI18n();
const { favorites, clearFavorites } = useFavorites();
const showToast = useToast();

usePageTitle('favorites.title');

// Get Page Content
const { data: pageContent } = useAsyncData(
	'favorites-page-content',
	() => useApi().get('/page-content/favorites').then((d) => d.data),
	{ watch: [locale] }
);

const loading = ref(true);
const favoriteHotels = ref<any[]>([]);
const confirmClearDialog = ref(false);

const totalValue = computed(() => {
	return favoriteHotels.value.reduce((sum, hotel) => sum + (hotel.price || 0), 0);
});

const averagePrice = computed(() => {
	if (favoriteHotels.value.length === 0) return 0;
	return totalValue.value / favoriteHotels.value.length;
});

const averageRating = computed(() => {
	if (favoriteHotels.value.length === 0) return 0;
	const totalRating = favoriteHotels.value.reduce((sum, hotel) => sum + (hotel.rate || 0), 0);
	return totalRating / favoriteHotels.value.length;
});

const fetchFavoriteHotels = async () => {
	if (favorites.value.length === 0) {
		loading.value = false;
		return;
	}

	loading.value = true;
	try {
		const requests = favorites.value.map((id) =>
			useApi().get(`/hotels/${id}?useLang=true&includes=location.city amenities`)
		);
		const responses = await Promise.allSettled(requests);

		favoriteHotels.value = responses
			.filter((result: any) => result.status === 'fulfilled' && result.value.data)
			.map((result: any) => result.value.data);
	} catch (error) {
		console.error('Error fetching favorite hotels:', error);
		showToast.error(t('favorites.error'));
	} finally {
		loading.value = false;
	}
};

const handleClearAll = () => {
	clearFavorites();
	favoriteHotels.value = [];
	confirmClearDialog.value = false;
	showToast.success(t('favorites.cleared'));
};

watch(favorites, () => {
	fetchFavoriteHotels();
}, { deep: true });

onMounted(() => {
	fetchFavoriteHotels();
});
</script>

<style scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fadeIn {
	animation: fadeIn 0.6s ease-out forwards;
	opacity: 0;
}
</style>
