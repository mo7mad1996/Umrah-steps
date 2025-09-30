<template>
	<div>
		<label v-if="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
			{{ title }}
		</label>

		<div
			class="flex gap-2 md:gap-4 border p-2 px-4 rounded-2xl items-center bg-white dark:!bg-gray-700"
			:class="`${customClass} ${disabled && '!bg-neutral-200 cursor-not-allowed'}`"
		>
			<!-- icons -->
			<img :icon="icon" v-if="img" width="22" :alt="name" />
			<Icon :name="icon" v-if="icon" class="text-[#929A9F]" />
			<slot name="icon" />

			<Field
				class="flex-1 w-0 text-sm outline-none max-md:placeholder:text-sm dark:text-white"
				:rules="rules"
				:name="name"
				:type="type"
				:placeholder="placeholder"
				:validateOnInput="true"
				v-model="modelValue"
				:inputmode="inputmode"
				:disabled="disabled"
			/>
		</div>

		<ErrorMessage :name="name" />
	</div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
	rules: { type: String, default: "" },
	title: { type: String, default: "" },
	type: { type: String, default: "text" },
	name: { type: String, default: "text" },
	placeholder: { type: String, required: false },
	icon: { type: String, required: false },
	img: { type: String, required: false },
	disabled: { type: null, default: false },
	customClass: { type: String, required: false },
	inputmode: { type: String, required: false },
});

const modelValue = defineModel();
</script>
