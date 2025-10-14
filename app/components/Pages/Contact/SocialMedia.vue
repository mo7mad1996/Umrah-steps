<template>
	<!-- Social Media -->
	<div
		class="bg-white dark:!bg-gray-800 rounded-2xl p-6 shadow-lg"
		v-if="contactInfosStatus == 'success' && contactInfos.length"
	>
		<h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
			{{ $t("contact.social.title") }}
		</h3>
		<div class="flex gap-3">
			<a
				v-for="(info, n) in contactInfos"
				:key="n"
				target="_blank"
				:href="info.url"
				class="w-12 h-12 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
				:style="{
					background: `${info.color}14`,
					color: `${info.color}`,
				}"
			>
				<Icon :name="info.icon" class="text-xl" />
			</a>
		</div>
	</div>
</template>
<script setup lang="ts">
// Get Contact Infos
const { data: contactInfos, status: contactInfosStatus } = useAsyncData("contactInfos", () =>
	useApi()
		.get("/contactInfo")
		.then((d) => d.data),
);
</script>
