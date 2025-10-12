<template>
	<div>
		<label v-if="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
			{{ title }}
		</label>
		<v-menu :content-class="menuClass" :attach="!dontAttach">
			<template v-slot:activator="{ props, isActive }">
				<slot name="activator" v-bind="props">
					<div
						v-bind="props"
						class="bg-white py-2 px-3 border rounded-[14px] gap-2 items-center shadow flex relative dark:!bg-gray-700"
						:class="customClass"
					>
						<slot name="icon" />
						<Icon :name="icon" v-if="icon" class="text-[#929A9F]" />

						<span class="flex-1">
							<span v-if="selected" class="dark:!text-white text-black font-semibold">
								{{
									list.find((i: any) => JSON.stringify(i.value) == JSON.stringify(selected))?.title
								}}
							</span>
							<span v-else class="text-gray-400">
								{{ placeholder || $t("global.select") }}
							</span>
						</span>

						<v-icon
							class="text-black dark:!text-white"
							icon="mdi-chevron-down"
							:class="{ '-scale-100': isActive }"
						/>
					</div>
				</slot>
			</template>
			<div class="bg-white dark:!bg-gray-700">
				<ul
					v-if="list.length"
					class="p-1 rounded-sm shadow max-h-80 h-80vh overflow-hidden relative blockScrollX"
					:class="menuClass"
					ref="container"
				>
					<li
						v-for="(i, n) in list"
						:key="i.value"
						@click="
							selected = i.value;
							emit('update', list[n]);
						"
						class="cursor-pointer group pt-px"
					>
						<div
							class="group-hover:bg-violet-500/20 rounded-sm px-4 py-2 dark:!text-white text-black"
							:class="{
								[activeClass]: i.value == selected,
								[itemClass]: itemClass,
								'bg-violet-100 dark:bg-violet-400': i.value == selected,
							}"
						>
							{{ i.title }}
						</div>
					</li>

					<li v-if="page <= meta.lastPage" v-observe-visibility="handelScroll">
						<div class="loader" v-if="status == 'pending'" />
					</li>
				</ul>

				<button
					v-else-if="error"
					class="flex gap-2 items-center rounded-md bg-rose-50 hover:bg-rose-100 shadow px-4 py-2 mx-auto my-4 text-gray-500 text-sm"
					@click.prevent.stop="refresh"
				>
					<v-icon icon="mdi-reload" />
					<span>
						{{ $t("global.reload") }}
					</span>
				</button>

				<GlobalNoData :status="status" :data="list || []" />
			</div>
		</v-menu>
		<ErrorMessage :name="name" />
	</div>
</template>

<script setup lang="ts">
import { useField, ErrorMessage } from "vee-validate";

// types
type Item = { title: any; value: any };

// init
const props = withDefaults(
	defineProps<{
		title?: string;
		menuClass?: string;
		dontAttach?: boolean;
		customClass?: string;
		icon?: string;
		itemClass?: string;
		activeClass?: string;
		items?: Item[];
		defaultValue?: any;
		name?: string;
		rules?: string;
		placeholder?: string;
		page?: number;
		status?: string;
		error?: any;
		refresh?: () => void;
	}>(),
	{
		page: 1,
		status: "success",
		refresh: () => {},
		name: "select",
		menuClass: "",
		customClass: "",
		itemClass: "",
		activeClass: "",
	},
);
const { $initPerfectScrollbar }: any = useNuxtApp();
const select = useField(props.name, props.rules);
const emit = defineEmits(["update", "fetch"]);

// data
const container = ref(null);
const selected = defineModel();
const page = ref(props.page || 1);

if (select.value.value) selected.value = select.value.value;

const meta = ref({ lastPage: 2 });
const list = computed(() => props.items || []);
if ("undefined" != typeof props.defaultValue) selected.value = props.defaultValue;

// methods
watch(
	selected,
	(v, oldValue) => {
		if (oldValue != v) if (typeof oldValue == typeof v || v) select.setValue(v, true);
	},
	{ immediate: true },
);

const handelScroll = (v: boolean) => {
	if (v) page.value += 1;
};
watch(page, (v) => {
	emit("fetch", v);
});

watch(container, (v) => {
	if (v) $initPerfectScrollbar(v);
});
</script>
