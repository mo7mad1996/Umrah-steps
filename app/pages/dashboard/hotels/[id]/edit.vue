<template>
	<LayoutDashboardContent>
		<template #header>
			<LayoutDashboardPageTitle :title="$t('dashboard.hotel.edit')" />
		</template>

		<template v-slot="d">
			<PagesDashboardHotelForm is-edit />
		</template>
	</LayoutDashboardContent>
</template>

<script setup lang="ts">
usePageTitle("dashboard.hotel.edit");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
