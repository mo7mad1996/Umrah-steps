<template>
	<v-btn
		:disabled="isLoading"
		:loading="isLoading"
		color="primary"
		class="mt-6 w-full block"
		type="submit"
		size="large"
	>
		{{ text || $t("global.save") }}
	</v-btn>
</template>

<script setup>
const props = defineProps({
	text: { type: String, default: "" },
	isLoading: { type: Boolean, default: false },
});
</script>
