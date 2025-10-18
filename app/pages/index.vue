<template>
	<main class="bg-natural-50 dark:bg-zinc-800">
		<PagesHomeHero />
		<PagesHomeSwiper />
		<PagesHomeHotels />
	</main>
</template>

<script setup lang="ts">
usePageTitle("home.title");

const { locale } = useI18n();
const { data: pageContent, status: PageContentStatus } = useAsyncData("pageContent-home", () =>
	useApi()
		.get("/page-content/home")
		.then((d) => d.data),
);

useSeoMeta({
	description: () => pageContent.value?.seo?.description[locale.value],
	keywords: () => pageContent.value?.seo?.keywords[locale.value],
});
</script>
