<template>
	<!-- Filters Section -->
	<div
		class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8"
	>
		<div class="w-full lg:flex-1">
			<div>
				<h3 class="text-base md:text-lg font-semibold text-gray-800 dark:text-white mb-4">
					{{ $t("hotels.results") }}:
				</h3>

				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					<div class="min-w-0">
						<!-- Price Range -->
						<span class="text-xs md:text-sm mb-2 block text-gray-600 dark:text-gray-400">
							{{ $t("hotels.priceRange") }}:
						</span>
						<InputsSelect
							v-model="filters.price"
							:items="[
								{ value: [0, Infinity], title: $t('hotels.price_range.not_required') },
								{ value: [0, 500], title: $t('hotels.price_range.economy') },
								{ value: [500, 1000], title: $t('hotels.price_range.medium') },
								{ value: [1000, Infinity], title: $t('hotels.price_range.luxury') },
							]"
						/>
					</div>

					<!-- Star Rating -->
					<div class="min-w-0">
						<span class="text-xs md:text-sm mb-2 block text-gray-600 dark:text-gray-400">
							{{ $t("hotels.rating") }}:
						</span>
						<InputsSelect
							v-model="filters.rate"
							:items="[
								{ value: [0, 5], title: $t('hotels.stars.not_required') },
								{ value: [3, 5], title: $t('hotels.stars.3_plus') },
								{ value: [4, 5], title: $t('hotels.stars.4_plus') },
								{ value: [5, 5], title: $t('hotels.stars.5_only') },
							]"
						/>
					</div>

					<!-- Distance -->
					<div class="min-w-0">
						<span class="text-xs md:text-sm mb-2 block text-gray-600 dark:text-gray-400">
							{{ $t("hotels.distance.title") }}:
						</span>
						<InputsSelect
							v-model="filters.distance"
							:items="[
								{ value: undefined, title: $t('hotels.distance.not_required') },
								{ value: 1, title: $t('hotels.distance.walking') },
								{ value: 2, title: $t('hotels.distance.near') },
								{ value: 3, title: $t('hotels.distance.medium') },
							]"
						/>
					</div>

					<!-- here we are -->
					<div class="w-full lg:w-auto">
						<span class="text-xs md:text-sm mb-2 block text-gray-600 dark:text-gray-400">
							{{ $t("hotels.viewMode") }}:
						</span>

						<InputsRadio
							class="dark:!bg-transparent w-full lg:w-auto border !border-transparent"
							activeClass="dark:!bg-transparent dark:!border-gold dark:border  dark:text-yellow-400 dark:hover:!bg-white/20"
							itemClass="dark:text-gray-600/80 dark:hover:!bg-white/20"
							v-model="filters.viewMode"
							name="viewMode"
							:data="[
								{ icon: 'material-symbols:calendar-view-day', value: 'list' },
								{ icon: 'mingcute:grid-fill', value: 'grid' },
							]"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	filters: {
		price: number[];
		rate: number[];
		distance?: number;
		viewMode: "list" | "grid";
	};
}>();
</script>
