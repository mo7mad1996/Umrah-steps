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
					<template #actions="{ item }">
						{{ item }}
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
</script>
