<template>
	<div v-if="data && data.length" class="p-1 rounded shadow bg-background dark:bg-background-dark">
		<template>
			<slot v-for="(item, n) in data" :key="n" v-bind="{ item }">
				<div class="p-2">
					<slot
						v-for="header in headers || []"
						:key="header.key"
						:name="header.key"
						v-bind="{ row: item, item: item[header.key] }"
					>
						<div>
							{{ item[header.key] }}
						</div>
					</slot>
				</div>
			</slot>
		</template>
		<GlobalLoading v-if="status == 'pending'" />
		<div v-else-if="!finished" v-intersect="getData" class="p-1"></div>
	</div>

	<GlobalError :error="error" :status="status" :refresh="refresh" />
	<GlobalNoData :data="data" :status="status" />
</template>

<script setup lang="ts">
const props = defineProps<{
	headers?: {
		title: string;
		key: string;
	}[];
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
