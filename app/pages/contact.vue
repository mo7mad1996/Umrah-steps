<template>
	<div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
		<!-- Dynamic Background Image -->
		<GlobalImageMask :src="pageContent?.content?.image || '/images/hotel.jpg'" />

		<!-- Page Header -->
		<GlobalPageTitle :title="$t('contact.title')" :subTitle="$t('contact.subtitle')" />

		<!-- Main Content -->
		<div class="container mx-auto px-6 py-16">
			<!-- Contact Methods -->
			<LazyPagesContactMethods />

			<!-- Contact Form & Info -->
			<section class="mb-16">
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
					<!-- Contact Form -->
					<LazyPagesContactForm />

					<!-- Contact Information -->
					<div class="space-y-6">
						<!-- Office Hours -->
						<div
							class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg"
							v-if="'success' == workHoursStatus"
						>
							<h3
								class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3"
							>
								<Icon name="mdi:clock" class="text-primary" />
								{{ $t("contact.info.hours") }}
							</h3>
							<div class="space-y-3 text-gray-600 dark:text-gray-400">
								<div class="flex justify-between" v-for="h in workHours" :key="h.id">
									<span>{{ h.day }}</span>
									<span>{{ h.time }}</span>
								</div>
							</div>
						</div>

						<!-- Quick Links -->
						<div class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg">
							<h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
								{{ $t("contact.quick_links.title") }}
							</h3>

							<div class="space-y-3">
								<NuxtLink
									to="/hotels"
									class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
								>
									<Icon name="ri:hotel-bed-fill" />
									{{ $t("nav.hotels") }}
								</NuxtLink>
								<NuxtLink
									to="/about"
									class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
								>
									<Icon name="mdi:information" />
									{{ $t("nav.about") }}
								</NuxtLink>
								<a
									v-if="globalData?.mainPhone"
									:href="`tel:${globalData?.mainPhone}`"
									class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
								>
									<Icon name="mdi:phone" />
									{{ $t("contact.emergency_call") }}
								</a>
							</div>
						</div>

						<LazyPagesContactSocialMedia />
					</div>
				</div>
			</section>

			<!-- FAQ Section -->
			<LazyPagesContactFaqs />

			<!-- Map Section -->
			<GlobalMap />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAsyncData } from "#app";

usePageTitle("contact.title");
const { locale } = useI18n();

// Get Page Content
const { data: pageContent } = useAsyncData(
	"contact-page-content",
	() =>
		useApi()
			.get("/page-content/contact")
			.then((d) => d.data),
	{ watch: [locale] },
);

// Get Work Hours
const { data: workHours, status: workHoursStatus } = useAsyncData(
	"workHours",
	() =>
		useApi()
			.get("workHours")
			.then((d) => d.data),
	{ watch: [locale] },
);

const { data: globalData, status: globalDataStatus } = useAsyncData("globalData", () =>
	useApi()
		.get("globalData")
		.then((d) => d.data),
);
</script>
