<template>
	<LazyLayoutDashboardContent>
		<template #header>
			<LayoutDashboardPageTitle :title="$t('dashboard.site_settings.title')" />
		</template>

		<v-tabs fixed-tabs v-model="activeTab">
			<v-tab v-for="t in tabs" :key="t.value" :value="t.value" :append-icon="t.icon">
				{{ $t(t.title) }}
			</v-tab>
		</v-tabs>

		<v-window v-model="activeTab">
			<v-window-item v-for="t in tabs" :key="t.value" :value="t.value">
				<component :is="t.component" />
			</v-window-item>
		</v-window>
	</LazyLayoutDashboardContent>
</template>

<script setup lang="ts">
import HomeForm from "~/components/Pages/Dashboard/PageContent/HomeForm.vue";
import HotelsForm from "~/components/Pages/Dashboard/PageContent/HotelsForm.vue";
import AboutForm from "~/components/Pages/Dashboard/PageContent/AboutForm.vue";
import ContactForm from "~/components/Pages/Dashboard/PageContent/ContactForm.vue";
import FavoritesForm from "~/components/Pages/Dashboard/PageContent/AboutForm.vue";

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.query.tab || "home");

watch(activeTab, (v) =>
	router.push({
		query: {
			tab: v,
		},
	}),
);
const tabs = [
	{
		title: "nav.home",
		value: "home",
		icon: "mdi:home",
		component: HomeForm,
	},
	{
		title: "nav.hotels",
		value: "hotels",
		icon: "mdi:hotel",
		component: HotelsForm,
	},
	{
		title: "nav.about",
		value: "about",
		icon: "mdi:information",
		component: AboutForm,
	},
	{
		title: "nav.contact",
		value: "contact",
		icon: "mdi:email",
		component: ContactForm,
	},
	{
		title: "nav.favorites",
		value: "favorites",
		icon: "mdi:hart",
		component: FavoritesForm,
	},
];

usePageTitle("dashboard.site_settings.title");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
