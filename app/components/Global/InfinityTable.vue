<template>
	<div v-if="data">
		<template>
			<slot v-for="(item, n) in data" :key="n" v-bind="{ item }" />
		</template>
		<GlobalLoading v-if="status == 'pending'" />
		<div v-else-if="!finished" v-intersect="getData" class="p-1"></div>
	</div>

	<GlobalError :error="error" :status="status" :refresh="refresh" />
	<GlobalNoData :data="data" :status="status" />
</template>

<script setup lang="ts">
const props = defineProps<{
	per_page: number;
	page: number;
	finished: boolean;
	data: any[];
	error: any;
	status: string;
	refresh: () => void;
}>();

const page = ref(props.page);
const emit = defineEmits(["update"]);

watch(
	page,
	() => {
		emit("update", page.value);
	},
	{ immediate: true },
);

const getData = (visible: boolean) => {
	if (visible) page.value += 1;
};
</script>
