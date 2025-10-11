<template>
	<div>
		<v-checkbox
			v-model="modelValue"
			class="checkbox"
			:id="id || name"
			:ripple="false"
			:true-value="value || 'yes'"
			:false-value="value ? undefined : 'no'"
			color="primary"
		>
			<template v-slot:label>
				<div
					class="text-sm h-full w-full items-center !flex-1 cursor-pointer dark:!text-white p-2 flex"
				>
					{{ title }}
				</div>
			</template>
		</v-checkbox>

		<ErrorMessage :name="name" />
	</div>
</template>

<script setup>
import { useField, ErrorMessage } from "vee-validate";

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
