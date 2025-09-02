<template>
  <div>
    <v-file-upload
      clearable
      density="compact"
      :name="name"
      :title="title"
      ref="input"
      @input="update"
      :accept="accept"
    />
    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
const input = ref(null);
import { useField, ErrorMessage } from "vee-validate";
const props = defineProps({
  title: { type: String, default: undefined },
  name: { type: String, default: undefined },
  rules: { type: String, default: "" },
  accept: { type: String, default: "" },
});

const field = useField(props.name, props.rules);
const modelValue = defineModel();
const update = (event) => {
  const { files } = event.target;
  const [file] = files;

  modelValue.value = files.length == 1 ? file : files;
};

watch(modelValue, (v) => field.setValue(v, true));
</script>
