<template>
	<div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
		<!-- Dynamic Background Image -->
		<GlobalImageMask :src="pageContent?.content?.image || '/images/hotel.jpg'" />

		<!-- Page Header -->
		<GlobalPageTitle
			:title="$t('global.terms_conditions.title')"
			:subTitle="$t('global.terms_conditions.subtitle')"
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
usePageTitle("global.terms_conditions.title");
const { locale } = useI18n();

// Get Page Content
const { data: pageContent, status } = usePageContent(PagesEnum.TERMS_CONDITIONS);

useSeoMeta({
	description: () => pageContent.value?.seo?.description[locale.value],
	keywords: () => pageContent.value?.seo?.keywords[locale.value],
});
</script>
