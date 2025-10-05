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
				<GlobalInfinityTable
					:data="hotels"
					:error="error"
					:status="status"
					:refresh="refresh"
					:page="page"
					:finished="finished"
					:headers="headers"
					:to="(item: any) => `/dashboard/hotels/${item.id}/edit`"
				/>
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
		title: "home.hotel.name",
		key: "name",
	},
	{
		title: "home.hotel.price",
		key: "status",
	},
];
</script>
