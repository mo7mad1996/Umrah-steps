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
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div
						v-for="hotel in hotels"
						:key="hotel.id"
						class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
					>
						<div class="relative h-48">
							<NuxtImg
								:src="hotel.img || '/logo/vertical.png'"
								:alt="hotel.name"
								class="w-full h-full object-cover"
							/>
							<div
								class="absolute top-3 right-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md"
							>
								<div class="flex items-center gap-1">
									<Icon
										v-for="i in hotel.rate"
										:key="i"
										name="ic:baseline-star"
										class="text-yellow-400 text-sm"
									/>
								</div>
							</div>
							<div
								class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
								:class="
									hotel.status === 'active'
										? 'bg-green-500 text-white'
										: 'bg-gray-500 text-white'
								"
							>
								{{ hotel.status === "active" ? $t("dashboard.hotel.status_active") : $t("dashboard.hotel.status_inactive") }}
							</div>
						</div>

						<div class="p-6">
							<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
								{{ hotel.name }}
							</h3>
							<div class="flex items-center text-gray-600 dark:text-gray-400 mb-3 text-sm">
								<Icon name="material-symbols-light:location-on" class="mr-1" />
								<span class="line-clamp-1">{{ hotel.location.city }}</span>
							</div>
							<p class="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
								{{ hotel.description }}
							</p>

							<div class="flex justify-between items-center mb-4">
								<div>
									<span class="text-2xl font-bold text-blue-600 dark:text-blue-400"
										>${{ hotel.price }}</span
									>
									<span class="text-sm text-gray-500 dark:text-gray-400"
										>/{{ $t("hotels.night") }}</span
									>
								</div>
								<div
									v-if="hotel.amenities && hotel.amenities.length > 0"
									class="text-sm text-gray-500 dark:text-gray-400"
								>
									{{ hotel.amenities.length }} {{ $t("hotels.amenities") }}
								</div>
							</div>

							<div class="flex gap-2">
								<NuxtLink
									:to="`/hotels/${hotel.id}`"
									class="flex-1 text-center bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
								>
									<Icon name="material-symbols:visibility-outline" />
									{{ $t("global.view") }}
								</NuxtLink>
								<button
									@click="editHotel(hotel.id)"
									class="flex-1 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-200 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
								>
									<Icon name="material-symbols:edit-outline" />
									{{ $t("global.edit") }}
								</button>
								<button
									@click="confirmDelete(hotel)"
									class="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-200 font-medium py-2 px-4 rounded-lg transition-colors"
								>
									<Icon name="material-symbols:delete-outline" />
								</button>
							</div>
						</div>
					</div>
				</div>

				<GlobalLoading v-if="status === 'pending'" />
				<GlobalError v-else-if="error" :error="error" />
				<GlobalNoData v-else-if="!hotels || hotels.length === 0" />

				<v-dialog v-model="deleteDialog" max-width="500">
					<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
						<div class="flex items-start gap-4 mb-6">
							<div class="bg-red-100 dark:bg-red-900 p-3 rounded-full">
								<Icon
									name="material-symbols:warning-outline"
									class="text-3xl text-red-600 dark:text-red-400"
								/>
							</div>
							<div>
								<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
									{{ $t("dashboard.hotel.delete_confirm_title") }}
								</h3>
								<p class="text-gray-600 dark:text-gray-400">
									{{ $t("dashboard.hotel.delete_confirm_message") }}
									<span class="font-semibold">{{ hotelToDelete?.name }}</span
									>?
								</p>
							</div>
						</div>

						<div class="flex justify-end gap-3">
							<button
								@click="deleteDialog = false"
								class="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
							>
								{{ $t("global.cancel") }}
							</button>
							<button
								@click="deleteHotel"
								:disabled="isDeleting"
								class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
							>
								<Icon
									v-if="isDeleting"
									name="line-md:loading-twotone-loop"
									class="text-xl"
								/>
								{{ isDeleting ? $t("global.deleting") : $t("global.delete") }}
							</button>
						</div>
					</div>
				</v-dialog>
			</template>
		</LayoutDashboardContent>
	</div>
</template>

<script setup lang="ts">
import type { IHotelResponse } from "~/types/hotel";

usePageTitle("dashboard.hotels");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

const { data: hotels, error, status, refresh, page, per_page, finished } = useHotels();

const deleteDialog = ref(false);
const hotelToDelete = ref<IHotelResponse | null>(null);
const isDeleting = ref(false);

const editHotel = (id: string) => {
	navigateTo(`/dashboard/hotels/${id}`);
};

const confirmDelete = (hotel: IHotelResponse) => {
	hotelToDelete.value = hotel;
	deleteDialog.value = true;
};

const deleteHotel = async () => {
	if (!hotelToDelete.value) return;

	try {
		isDeleting.value = true;
		await useApi().delete(`/hotels/${hotelToDelete.value.id}`);
		useToast().success($t("dashboard.hotel.success_deleted"));
		deleteDialog.value = false;
		hotelToDelete.value = null;
		await refresh();
	} catch (error: any) {
		console.error("Error deleting hotel:", error);
		useToast().error(
			error?.response?.data?.message || error?.message || $t("dashboard.hotel.delete_error"),
		);
	} finally {
		isDeleting.value = false;
	}
};
</script>
