<template>
	<div>
		<LayoutDashboardContent>
			<template #header>
				<LayoutDashboardPageTitle :title="$t('dashboard.hotel.edit')" />
			</template>

			<template v-slot="{}">
				<PagesDashboardHotelForm is-edit />
			</template>
		</LayoutDashboardContent>
	</div>
</template>

<script setup lang="ts">
usePageTitle("dashboard.hotel.edit");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
