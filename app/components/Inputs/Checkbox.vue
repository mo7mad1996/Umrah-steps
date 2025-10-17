<template>
	<div>
		<v-switch
			v-model="modelValue"
			:id="id || name"
			:ripple="false"
			:true-value="value || 'yes'"
			:false-value="value ? undefined : 'no'"
			:color="dark ? `secondary` : `primary`"
		>
			<template v-slot:label>
				<div
					class="text-sm h-full w-full items-center !flex-1 cursor-pointer dark:!text-white p-2 flex"
				>
					{{ title }}
				</div>
			</template>
		</v-switch>

		<ErrorMessage :name="name" />
	</div>
</template>

<script setup>
import { useField, ErrorMessage } from "vee-validate";
const theme = useTheme();
const dark = computed(() => theme.name.value == "dark");

const props = defineProps({
	name: { type: String, default: "checkbox" },
	id: { type: String, default: "" },
	title: { type: String, default: "" },
	rules: { type: String, default: "" },
	value: { type: String, default: "" },
});

const field = useField(props.name, props.rules);

const modelValue = defineModel();

if (typeof field.value.value != "undefined") modelValue.value = field.value.value;

watch(
	modelValue,
	(v, oldValue) => {
		if (oldValue != v)
			if (typeof oldValue == typeof v || v) {
				field.setValue(v, true);
			}
	},
	{ immediate: true },
);
</script>
