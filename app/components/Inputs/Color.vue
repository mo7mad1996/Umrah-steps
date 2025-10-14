<template>
	<div>
		<div class="flex flex-row gap-2 items-center md:gap-4 cursor-pointer">
			<v-menu :close-on-content-click="false">
				<template v-slot:activator="{ props }">
					<div class="h-7 w-12 color-value rounded shadow cursor-pointer" v-bind="props"></div>

					<h3 class="" v-bind="props">
						{{ title }}
					</h3>
				</template>

				<v-color-picker hide-inputs v-model="modelValue"></v-color-picker>
			</v-menu>
		</div>

		<ErrorMessage :name="name" />
	</div>
</template>

<script setup>
import { useField, ErrorMessage } from "vee-validate";

const props = defineProps({
	title: {
		type: String,
		required: false,
	},
	name: {
		type: String,
		required: true,
	},
});

const { setValue, value } = useField(props.name, "");
const settings = useState("settings", () => ({}));

const modelValue = defineModel();

modelValue.value = value.value || "#000000";

watch(
	modelValue,
	(v, oldValue) => {
		if (v) setValue(v, true);
		if (oldValue) Object.assign(settings.value, { [props.name]: v });
	},
	{ immediate: true },
);
</script>

<style scoped>
.color-value {
	background-color: v-bind(modelValue);
}
</style>
