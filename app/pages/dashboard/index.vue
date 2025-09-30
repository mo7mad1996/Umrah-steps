<template>
	<div class="grid place-content-center h-full">
		<NuxtImg :src="`/logo/vertical.png`" class="h-40 w-40 object-contain opacity-50" />
	</div>
</template>

<script setup lang="ts">
usePageTitle("dashboard.home");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
