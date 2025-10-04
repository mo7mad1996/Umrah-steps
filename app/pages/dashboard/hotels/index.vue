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

			<template v-slot="{}">
				<!-- <GlobalInfinityTable
					:data="hotels"
					:error="error"
					:status="status"
					:refresh="refresh"
					:page="page"
					:finished="finished"
					:headers="headers"
				>
				</GlobalInfinityTable> -->
				<pre>{{ hotels }}</pre>
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

const { data: hotels, error, status, refresh, page, finished } = useHotels();

// const { t } = useI18n();
// const toast = useToast();

// const deleteDialog = ref(false);
// const hotelToDelete = ref<IHotelResponse | null>(null);
// const isDeleting = ref(false);

// const headers: { title: string; key: string }[] = [
// 	{
// 		title: "global.name",
// 		key: "name",
// 	},
// ];

// const confirmDelete = (hotel: IHotelResponse) => {
// 	hotelToDelete.value = hotel;
// 	deleteDialog.value = true;
// };

// const deleteHotel = async () => {
// 	if (!hotelToDelete.value) return;

// 	try {
// 		isDeleting.value = true;
// 		await useApi().delete(`/hotels/${hotelToDelete.value.id}`);
// 		deleteDialog.value = false;
// 		hotelToDelete.value = null;
// 		await refresh();
// 	} catch (error: any) {
// 		console.error("Error deleting hotel:", error);
// 	} finally {
// 		isDeleting.value = false;
// 	}
// };
</script>
