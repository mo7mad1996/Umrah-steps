<template>
	<div>
		<LayoutDashboardContent>
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
				<pre>{{ data }}</pre>
				<GlobalInfinityTable
					:data="hotels"
					:error="error"
					:status="status"
					:finished="finished"
					:refresh="refresh"
					:page="page"
					:per_page="per_page"
				>
					<template v-slot="{ item: hotel }">
						<pre>{{ hotel }}</pre>

						<!-- <td class="px-6 py-4 whitespace-nowrap">
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
						</td> -->
					</template>
				</GlobalInfinityTable>
			</template>
		</LayoutDashboardContent>
	</div>
</template>

<script setup lang="ts">
usePageTitle("dashboard.hotels");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

const { data: hotels, error, status, refresh, page, per_page, finished } = useHotels();

// Actions
const editHotel = (id: string) => {
	navigateTo(`/dashboard/hotels/${id}/edit`);
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
