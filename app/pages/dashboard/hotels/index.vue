<template>
	<div>
		<LayoutDashboardContent v-bind="{ data: hotels, error, status, refresh }">
			<template #header>
				<LayoutDashboardPageTitle
					:title="$t('dashboard.hotels')"
					:buttons="[
						{
							text: $t('dashboard.hotel.add'),
							to: '/dashboard/hotels/add',
							icon: 'material-symbols:add',
						},
					]"
				/>
			</template>

			<template v-slot="{ data }">
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead class="bg-gray-50 dark:bg-gray-900">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									{{ $t("dashboard.hotel.image") }}
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									{{ $t("dashboard.hotel.name") }}
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									{{ $t("dashboard.hotel.location") }}
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									{{ $t("dashboard.hotel.rate") }}
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									{{ $t("dashboard.hotel.actions") }}
								</th>
							</tr>
						</thead>
						<tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
							<tr
								v-for="hotel in displayedHotels"
								:key="hotel.id"
								class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
							>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex-shrink-0 h-16 w-16">
										<NuxtImg
											:src="hotel.img || '/logo/vertical.png'"
											:alt="hotel.name"
											class="h-16 w-16 rounded-lg object-cover"
										/>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-sm font-medium text-gray-900 dark:text-gray-100">
										{{ hotel.name }}
									</div>
									<div class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
										{{ hotel.description }}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center text-sm text-gray-900 dark:text-gray-100">
										<Icon name="material-symbols-light:location-on" class="mr-1" />
										{{ hotel.location.city }}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center gap-1">
										<Icon
											v-for="i in hotel.rate"
											:key="i"
											name="ic:baseline-star"
											class="text-yellow-400 text-lg"
										/>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div class="flex items-center gap-2">
										<NuxtLink
											:to="`/hotels/${hotel.id}`"
											class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
										>
											<Icon name="material-symbols:visibility-outline" class="text-xl" />
										</NuxtLink>
										<button
											@click="editHotel(hotel.id)"
											class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
										>
											<Icon name="material-symbols:edit-outline" class="text-xl" />
										</button>
										<button
											@click="deleteHotel(hotel.id)"
											class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
										>
											<Icon name="material-symbols:delete-outline" class="text-xl" />
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Infinite Scroll Trigger -->
				<div v-if="hasMore && hotels.length > 0" ref="loadMoreTrigger" class="py-8 text-center">
					<div v-if="loadingMore" class="flex justify-center">
						<Icon name="line-md:loading-twotone-loop" class="text-3xl text-primary" />
					</div>
				</div>

				<!-- No More Results -->
				<div
					v-if="!hasMore && hotels.length > 0"
					class="py-4 text-center text-sm text-gray-500 dark:text-gray-400"
				>
					{{ $t("dashboard.hotel.no_more_results") }}
				</div>
			</template>
		</LayoutDashboardContent>
	</div>
</template>

<script setup lang="ts">
import type { Hotel } from "~/types/hotel";

usePageTitle("dashboard.hotels");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

const { data: hotels, error, status, refresh, page, per_page } = useHotels();
const displayedHotels = ref<Hotel[]>([]);
const loadingMore = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);

// Set initial per_page
per_page.value = 12;

// Computed property to check if there are more items to load
const hasMore = computed(() => {
	if (!hotels.value) return false;
	return hotels.value.length >= per_page.value * page.value;
});

// Watch for data changes and update displayed hotels
watch(
	hotels,
	(newHotels) => {
		if (newHotels) {
			displayedHotels.value = newHotels;
		}
	},
	{ immediate: true },
);

// Load more function
const loadMore = async () => {
	if (loadingMore.value || !hasMore.value) return;

	loadingMore.value = true;
	page.value += 1;

	// Wait for data to be fetched
	await refresh();

	loadingMore.value = false;
};

// Intersection Observer for infinite scroll
onMounted(() => {
	if (!loadMoreTrigger.value) return;

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting && hasMore.value && !loadingMore.value) {
				loadMore();
			}
		},
		{
			rootMargin: "100px",
		},
	);

	observer.observe(loadMoreTrigger.value);

	onUnmounted(() => {
		observer.disconnect();
	});
});

// Actions
const editHotel = (id: string) => {
	navigateTo(`/dashboard/hotels/edit/${id}`);
};

const deleteHotel = async (id: string) => {
	if (confirm("Are you sure you want to delete this hotel?")) {
		try {
			// Add delete API call here
			console.log("Delete hotel:", id);
			// Refresh the list after deletion
			await refresh();
		} catch (error) {
			console.error("Error deleting hotel:", error);
		}
	}
};
</script>
