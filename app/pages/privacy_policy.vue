<template>
	<div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
		<!-- Dynamic Background Image -->
		<GlobalImageMask :src="pageContent?.content?.image || '/images/hotel.jpg'" />

		<!-- Page Header -->
		<GlobalPageTitle
			:title="$t('global.privacy_policy.title')"
			:subTitle="$t('global.privacy_policy.subtitle')"
		/>

		<GlobalLoading v-if="status == 'pending'" />
		<div
			v-if="status == 'success'"
			v-html="pageContent?.content?.body[locale]"
			class="mx-auto container"
		></div>
	</div>
</template>

<script setup lang="ts">
usePageTitle("global.privacy_policy.title");
const { locale } = useI18n();

// Get Page Content
const { data: pageContent, status } = usePageContent(PagesEnum.PRIVACY_POLICY);

useSeoMeta({
	description: () => pageContent.value?.seo?.description[locale.value],
	keywords: () => pageContent.value?.seo?.keywords[locale.value],
});
</script>
