<template>
	<div>
		<LayoutDashboardContent :data="hotels">
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
				<GlobalInfinityTable
					v-if="hotels"
					:data="hotels"
					:error="error"
					:status="status"
					:refresh="refresh"
					:page="page"
					:finished="finished"
					:headers="headers"
					:to="(item: any) => `/dashboard/hotels/${item.id}/edit`"
				>
					<template #actions="{ row }">
						<div class="h-full flex items-center justify-end" @click.prevent.stop>
							<GlobalConfirmDialog
								:title="$t('global.delete')"
								:content="$t('global.delete_question')"
								@confirm="() => deleteHotel(row.id)"
							>
								<template v-slot="props">
									<button
										@click.prevent.stop
										v-bind="props"
										class="aspect-square block h-full hover:bg-blue-600/10 rounded-full hover:shadow text-red-600"
									>
										<Icon name="material-symbols:delete-outline" class="h-full" />
									</button>
								</template>
							</GlobalConfirmDialog>
						</div>
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

const { data: hotels, error, status, refresh, page, finished } = useHotels();
const headers: { title: string; key: string }[] = [
	{
		title: "dashboard.hotel.name.global",
		key: "name",
	},
	{
		title: "dashboard.hotel.status",
		key: "status",
	},
	{
		title: "dashboard.hotel.min_price",
		key: "price",
	},
	{
		title: "dashboard.actions",
		key: "actions",
	},
];

const deleteHotel = async (id: string) => {
	try {
		await useApi().delete(`/hotels/${id}`);
		await refresh();
	} catch (err) {
		console.error(err);
	}
};

const goto = useGoTo({
	duration: 500,
});

onMounted(() => {
	goto("h1");
});
</script>
