<template>
  <div>
    <v-checkbox
      v-model="modelValue"
      class="checkbox"
      :id="id || name"
      color="#596DE7"
      :ripple="false"
      true-value="yes"
      false-value="no"
    >
      <template v-slot:label>
        <label
          :for="id || name"
          class="text-sm h-full w-full items-center flex cursor-pointer"
        >
          {{ title }}
        </label>
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
});

const field = useField(props.name, props.rules);

const modelValue = defineModel();

if (typeof field.value.value != "undefined")
  modelValue.value = field.value.value;

watch(
  modelValue,
  (v, oldValue) => {
    if (oldValue != v)
      if (typeof oldValue == typeof v || v) field.setValue(v, true);
  },
  { immediate: true }
);
</script>
