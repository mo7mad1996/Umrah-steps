<template>
  <div>
    <textarea
      :placeholder="placeholder"
      :rows="rows"
      v-model="modelValue"
      class="w-full border rounded-2xl px-3 py-3 outline-none block bg-white max-md:text-sm dark:!border-gray-600 dark:!bg-gray-700 dark:!text-white"
      :class="customClass"
    ></textarea>
    <ErrorMessage :name="name" class="!text-xs" />
  </div>
</template>

<script setup>
import { ErrorMessage, useField } from "vee-validate";

const props = defineProps({
  rows: { required: false, type: null, default: 5 },
  placeholder: { required: false, type: String, default: "" },
  customClass: { required: false, type: String, default: "" },
  name: { required: false, type: String, default: "textarea" },
  rules: { required: false, type: String, default: "" },
});

const field = useField(props.name, props.rules);
const modelValue = defineModel();

if (field.value.value) modelValue.value = field.value.value;
watch(
  modelValue,
  (v, oldValue) => {
    if (oldValue != v)
      if (typeof oldValue == typeof v || v) field.setValue(v, true);
  },
  { immediate: true },
);
</script>
