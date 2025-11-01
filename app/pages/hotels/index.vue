<template>
	<div
		class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative"
	>
		<!-- <GlobalImageMask :src="pageContent?.content?.image || `/images/hotel2.jpeg`" /> -->
		<GlobalPageTitle class="mt-0" :title="$t('hotels.title')" :subTitle="$t('hotels.subtitle')" />

		<section class="py-8 md:py-12 container mx-auto px-4 md:px-6">
			<h1 class="text-5xl my-24 max-md:text-3xl max-md:my-12 text-gray-800 dark:text-gray-200">
				{{ $t("hotels.title") }}:
			</h1>

			<GlobalInfinityTable
				class="gap-4 p-4 my-4 rounded-xl"
				:class="filters.viewMode === 'grid' ? 'grid md:grid-cols-3' : 'flex flex-col'"
				:data="hotels"
				:refresh="refresh"
				:page="page"
				:finished="finished"
				:error="error"
				:status="status"
			>
				<template #default="{ item }">
					<GlobalHotelsItem :hotel="item" />
				</template>
			</GlobalInfinityTable>
		</section>
	</div>
</template>

<script setup lang="ts">
// Reactive data
const filters = reactive({
	price: [0, Infinity],
	rate: [0, 5],
	distance: undefined,
	viewMode: "grid" as "list" | "grid",
	search: "",
});
const { locale } = useI18n();

// Fetch hotels data
const { data: hotels, status, error, refresh, page, count, finished } = useHotels();

// SEO
usePageTitle("hotels.title");

// SEO
const { data: pageContent, status: PageContentStatus } = usePageContent(PagesEnum.HOTELS);

useSeoMeta({
	description: () => pageContent.value?.seo?.description[locale.value],
	keywords: () => pageContent.value?.seo?.keywords[locale.value],
});
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
