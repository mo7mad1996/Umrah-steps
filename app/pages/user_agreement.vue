<template>
	<div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
		<!-- Page Header -->
		<GlobalPageTitle
			:title="$t('global.user_agreement.title')"
			:subTitle="$t('global.user_agreement.subtitle')"
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
usePageTitle("global.user_agreement.title");
const { locale } = useI18n();

// Get Page Content
const { data: pageContent, status } = usePageContent(PagesEnum.USER_AGREEMENT);

useSeoMeta({
	description: () => pageContent.value?.seo?.description[locale.value],
	keywords: () => pageContent.value?.seo?.keywords[locale.value],
});
</script>
