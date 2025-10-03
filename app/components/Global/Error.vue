<template>
	<div
		class="mx-auto max-w-4xl text-center bg-white dark:!bg-rose-800/10 shadow rounded-2xl p-4"
		v-if="error && status == 'error'"
	>
		<v-icon icon="mdi-alert-circle-outline" class="text-red-500 mb-3" size="100" />
		<h3 class="text-lg text-red-600 dark:text-red-400 font-bold mb-2">
			{{ $t("global.error") }}
		</h3>
		<p class="text-sm text-zinc-700 dark:text-zinc-400 my-4">{{ error?.message }}</p>
		<button
			v-if="refresh"
			class="flex gap-2 dark:text-gray-200 items-center rounded-md bg-rose-50 dark:bg-rose-900/70 hover:brightness-90 shadow px-4 py-2 mx-auto my-4"
			@click="refresh"
		>
			<v-icon icon="mdi-reload" />
			<span class="">
				{{ $t("global.reload") }}
			</span>
		</button>
	</div>
</template>

<script setup>
const props = defineProps({
	error: {
		type: null,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	refresh: {
		type: Function,
		required: false,
	},
});
</script>
