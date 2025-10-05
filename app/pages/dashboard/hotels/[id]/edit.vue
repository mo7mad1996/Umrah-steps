<template>
	<div>
		<LayoutDashboardContent>
			<template #header>
				<LayoutDashboardPageTitle :title="$t('dashboard.hotel.edit')" />
			</template>

			<template v-slot="{}">
				<PagesDashboardHotelForm :is-edit="true" />
			</template>
		</LayoutDashboardContent>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const id: string = route.params.id as string;

usePageTitle("dashboard.hotel.edit");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
