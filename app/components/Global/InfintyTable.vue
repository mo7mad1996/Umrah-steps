<template></template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		fetch: (per_page: number, page: number) => any;
		per_page?: number;
	}>(),
	{
		per_page: 12,
	},
);
const data = ref<any>([]);

const attr = {
	page: 1,
	per_page: props.per_page,
};
</script>
