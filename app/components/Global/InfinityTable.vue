<template>
	<ClientOnly>
		<div
			v-if="data && data.length"
			class="flex flex-col gap-1 p-1 shadow bg-background dark:!bg-background-dark"
		>
			<template v-for="(item, n) in data" :key="n">
				<slot v-bind="{ item }">
					<component
						:is="to ? NuxtLink : 'div'"
						:to="typeof to == 'function' ? to(item) : to"
						class="p-2 px-4 group hover:bg-gray-500/20 rounded before:bg-primary relative before:w-1 before:h-6 before:absolute before:top-1/2 before:-translate-y-1/2 before:right-0 before:rounded-l-xl before:hidden hover:before:block flex gap-1"
					>
						<div v-for="header in headers || []" :key="header.key" class="flex-1">
							<slot :name="header.key" v-bind="{ row: item, item: item[header.key] }">
								<h3 class="opacity-50 text-xs">
									{{ $t(header.title, header.title) }}
								</h3>

								<p>
									{{ item[header.key] }}
								</p>
							</slot>
						</div>
					</component>
				</slot>
			</template>
		</div>
		<GlobalLoading v-if="status == 'pending'" />
		<div v-else-if="!finished" v-intersect="getData" class="p-1"></div>

		<GlobalError :error="error" :status="status" :refresh="refresh" />
		<GlobalNoData :data="data" :status="status" />
	</ClientOnly>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

const props = defineProps<{
	headers?: {
		title: string;
		key: string;
	}[];
	page: number;
	to?: string | ((item: any) => string);
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
