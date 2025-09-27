<template>
	<section>
		<h1>hi</h1>
	</section>
</template>

<script setup lang="ts">
usePageTitle("dashboard.hotel.add");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
