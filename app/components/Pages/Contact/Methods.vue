<template>
	<section class="mb-16">
		<div class="mb-12 between-lines">
			<h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
				{{ $t("contact.methods.title") }}
			</h2>
		</div>

		<div v-if="contactInfosStatus === 'success'" class="flex flex-wrap justify-center gap-6">
			<!-- Phone -->
			<a
				:href="`tel:${globalData.mainPhone}`"
				v-if="globalData.mainPhone"
				class="bg-white w-52 dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
			>
				<div
					class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
				>
					<Icon name="mdi:phone" class="text-primary text-2xl" />
				</div>
				<h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
					{{ $t("contact.info.phone") }}
				</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
					{{ $t("contact.methods.phone_desc") }}
				</p>
				<div class="text-primary hover:text-primary/80 font-medium" dir="ltr">
					{{ globalData.mainPhone }}
				</div>
			</a>
			<a
				v-for="info in contactInfos"
				:key="info.id"
				:href="info.url"
				target="_blank"
				class="bg-white w-52 dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group block"
			>
				<div
					class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
					:style="{ backgroundColor: `${info.color}15` }"
				>
					<Icon :name="info.icon" class="text-2xl" :style="{ color: info.color }" />
				</div>
				<h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
					{{ info.name[locale] || info.name.ar }}
				</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm">
					{{ info.description[locale] || info.description.ar }}
				</p>
			</a>
		</div>

		<!-- Fallback if no contact infos -->
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- WhatsApp -->
			<div
				class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
			>
				<div
					class="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
				>
					<Icon name="mdi:whatsapp" class="text-green-500 text-2xl" />
				</div>
				<h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
					{{ $t("contact.methods.whatsapp") }}
				</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
					{{ $t("contact.methods.whatsapp_desc") }}
				</p>
				<span class="text-green-500 font-medium" dir="ltr"> +966 55 123 4567 </span>
			</div>

			<!-- Email -->
			<div
				class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
			>
				<div
					class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
				>
					<Icon name="mdi:email" class="text-blue-500 text-2xl" />
				</div>
				<h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
					{{ $t("contact.info.email") }}
				</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
					{{ $t("contact.methods.email_desc") }}
				</p>
				<span class="text-blue-500 font-medium text-sm"> info@example.com </span>
			</div>

			<!-- Location -->
			<div
				class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
			>
				<div
					class="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
				>
					<Icon name="mdi:map-marker" class="text-red-500 text-2xl" />
				</div>
				<h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
					{{ $t("contact.info.address") }}
				</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
					{{ $t("contact.methods.address_desc") }}
				</p>
				<p class="text-red-500 font-medium text-sm">{{ $t("contact.methods.address_value") }}</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const { locale } = useI18n();

// Get Contact Infos
const { data: contactInfos, status: contactInfosStatus } = useAsyncData(
	"contactInfos",
	() =>
		useApi()
			.get("/contactInfo")
			.then((d) => d.data),
	{ watch: [locale] },
);
const { data: globalData, status: globalDataStatus } = useGlobalData();

// Get Page Content for main phone
const { data: pageContent } = usePageContent(PagesEnum.ABOUT);
</script>
