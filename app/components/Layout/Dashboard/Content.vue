<template>
	<div>
		<!-- header slot -->
		<slot name="header" v-bind="data || {}" />

		<div class="bg-white rounded-sm md:!rounded-3xl p-2 md:p-5 shadow-xl">
			<!-- default slot -->
			<slot v-if="['success', 'idle'].includes(status)" v-bind="data" />

			<!-- loader slot -->
			<slot name="loader" v-if="status == 'pending'" v-bind="{ status }">
				<div
					class="mx-auto my-10 w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
				></div>
			</slot>

			<GlobalNoData :status="status" :data="data || []" />
			<GlobalError :status="status" :error="error" :refresh="refresh" />
		</div>

		<!-- outside slot -->
		<slot name="outside" v-bind="data || {}" />
	</div>
</template>

<script setup lang="ts">
useAsyncData;
const props = withDefaults(
	defineProps<{
		data?: any;
		error?: any;
		status?: any;
		refresh?: () => any;
	}>(),
	{
		data: null,
		error: null,
		status: "idle",
		refresh: () => null,
	},
);

const { data, error, status, refresh } = props;
</script>
