<template>
	<LayoutDashboardContent>
		<template #header>
			<LazyLayoutDashboardPageTitle :title="$t('dashboard.profile_settings')" />
		</template>

		<template>
			<pre>{{ user }}</pre>
			<Form>
				<div>
					<h3>{{ $t("dashboard.hotel.name.global") }}</h3>
					<div class="grid md:grid-cols-2 gap-4 my-3"></div>
				</div>
			</Form>
		</template>
	</LayoutDashboardContent>
</template>

<script setup lang="ts">
const user = useCookie("user", {});

// data
const hotel = reactive({
	name: { ar: "", en: "" },
});

// metadata
usePageTitle("dashboard.profile_settings");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
