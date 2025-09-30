<template>
	<div class="flex-1">
		<!-- header slot -->
		<slot name="header" v-bind="data || {}" />

		<div class="px-2 md:px-4">
			<div class="rounded-lg md:!rounded-3xl shadow-xl bg-white dark:!bg-gray-800 p-4 md:p-6">
				<!-- default slot -->
				<slot v-if="['success', 'idle'].includes(status)" v-bind="data" />

				<!-- loader slot -->
				<slot name="loader" v-if="status == 'pending'" v-bind="{ status }">
					<GlobalLoading />
				</slot>

				<GlobalNoData :status="status" :data="data || []" />
				<GlobalError :status="status" :error="error" :refresh="refresh" />
			</div>
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
