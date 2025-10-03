<template>
	<main class="bg-natural-50 dark:bg-zinc-800">
		<PagesHomeHero />
		<PagesHomeSwiper />
		<PagesHomeHotels />
	</main>
</template>

<script setup lang="ts">
import { usePageTitle } from "#imports";

usePageTitle("home.title");
</script>
