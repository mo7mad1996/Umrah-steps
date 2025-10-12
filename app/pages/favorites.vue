<template>

	<div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
		<!-- Background Image -->
		<GlobalImageMask src="/logo/light.png" />

		<!-- Page Header -->
		<GlobalPageTitle :title="$t('about.title')" :subTitle="$t('about.subtitle')" />k:bg-gray-900">
		<div class="container mx-auto px-4">
			<GlobalPageTitle :title="$t('favorites.title')" />

			<div v-if="loading" class="flex justify-center py-12">
				<GlobalLoading />
			</div>

			<div v-else-if="favoriteHotels.length === 0" class="py-12">
				<div class="flex flex-col items-center justify-center text-center">
					<div class="mb-6">
						<NuxtImg
							loading="lazy"
							src="/images/hotel.jpg"
							width="150"
							alt="No data"
							class="mx-auto opacity-50 rounded-lg"
						/>
					</div>
					<p class="text-lg mb-6 dark:text-gray-300">{{ $t("favorites.empty") }}</p>
					<NuxtLink
						to="/hotels"
						class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
					>
						<Icon name="mdi:magnify" size="20" />
						{{ $t("favorites.browse_hotels") }}
					</NuxtLink>
				</div>
			</div>

			<div v-else>
				<div
					class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
				>
					<p class="text-lg dark:text-white">
						{{ $t("favorites.count", { count: favoriteHotels.length }) }}
					</p>
					<v-btn
						color="error"
						variant="outlined"
						prepend-icon="mdi:delete"
						@click="confirmClearDialog = true"
						class="dark:text-red-400 dark:border-red-400"
					>
						{{ $t("favorites.clear_all") }}
					</v-btn>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<GlobalHotelsItem v-for="hotel in favoriteHotels" :key="hotel.id" :hotel="hotel" />
				</div>
			</div>
		</div>

		<GlobalConfirmDialog
			v-model="confirmClearDialog"
			:title="$t('favorites.confirm_clear')"
			:message="$t('favorites.confirm_clear_message')"
			:confirm-text="$t('global.delete')"
			:cancel-text="$t('global.cancel')"
			@confirm="handleClearAll"
			@cancel="confirmClearDialog = false"
		/>
	</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "default",
});

const { t } = useI18n();
const { favorites, clearFavorites } = useFavorites();
const showToast = useToast();

usePageTitle(t("favorites.title"));

const loading = ref(true);
const favoriteHotels = ref<any[]>([]);
const confirmClearDialog = ref(false);

const fetchFavoriteHotels = async () => {
	if (favorites.value.length === 0) {
		loading.value = false;
		return;
	}

	loading.value = true;
	try {
		const requests = favorites.value.map((id) => useApi().get(`/hotels/${id}?useLang=true`));
		const responses = await Promise.allSettled(requests);

		favoriteHotels.value = responses
			.filter((result: any) => result.status === "fulfilled" && result.value.data)
			.map((result: any) => result.value.data);
	} catch (error) {
		console.error("Error fetching favorite hotels:", error);
		showToast.error(t("favorites.error"));
	} finally {
		loading.value = false;
	}
};

const handleClearAll = () => {
	clearFavorites();
	favoriteHotels.value = [];
	confirmClearDialog.value = false;
	showToast.success(t("favorites.cleared"));
};

watch(
	favorites,
	() => {
		fetchFavoriteHotels();
	},
	{ deep: true },
);

onMounted(() => {
	fetchFavoriteHotels();
});
</script>
