<template>
	<div>
		<LayoutDashboardContent>
			<template #header>
				<LayoutDashboardPageTitle :title="$t('dashboard.hotel.edit')" />
			</template>

			<template v-slot="{ data }">
				<GlobalLoading v-if="pending" />
				<GlobalError v-else-if="error" :error="error" />
				<div v-else-if="hotel">
					<PagesDashboardHotelForm :is-edit="true" :initial-data="hotel" />
				</div>
			</template>
		</LayoutDashboardContent>
	</div>
</template>

<script setup lang="ts">
import type { IHotelResponseWithMultiLang } from "~/types/hotel";

const route = useRoute();

usePageTitle("dashboard.hotel.edit");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

const {
	data: hotel,

	pending,
	error,
} = await useFetch<IHotelResponseWithMultiLang>(`/api/hotels/${route.params.id}`);
</script>
