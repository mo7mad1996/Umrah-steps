<template>
	<div
		v-if="(status == 'success' && Array.isArray(data) && data.length == 0) || !data"
		class="flex justify-center items-center py-12 dark:!text-white/80"
	>
		<div class="select-none">
			<div class="image flex justify-center">
				<img loading="lazy" src="~/assets/images/no-data.png" width="150" alt="No data image" />
			</div>
			<h6 class="text-center">{{ $t("global.no_data") }}</h6>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ status: string; data: any[] | null }>();
</script>
