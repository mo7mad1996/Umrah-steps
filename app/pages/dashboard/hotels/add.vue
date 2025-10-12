<template>
	<LazyLayoutDashboardContent>
		<template #header>
			<LayoutDashboardPageTitle
				:title="$t('dashboard.hotel.add')"
				:subTitle="$t('dashboard.hotels')"
				:buttons="[
					{
						text: $t('global.back'),
						to: '/dashboard/hotels',
						icon: 'tabler:arrow-back',
					},
				]"
			/>
		</template>

		<template v-slot=""><PagesDashboardHotelForm /> </template>
	</LazyLayoutDashboardContent>
</template>

<script setup lang="ts">
// SEO and metadata
usePageTitle("dashboard.hotel.add");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
