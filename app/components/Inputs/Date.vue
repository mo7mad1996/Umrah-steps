<template>
  <div>
    <v-menu v-model="isOpen" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <div
          v-bind="props"
          class="flex gap-2 border px-2 py-2 rounded-2xl items-center bg-white dark:!bg-gray-700 dark:!text-white"
          :class="{
            [customClass]: customClass,
            '!bg-neutral-200 cursor-not-allowed  !text-neutral-400': disabled,
          }"
        >
          <v-icon
            icon="mdi-calendar-outline"
            color="#929A9F"
            class="dark:!text-white"
          />

          <template v-if="modelValue">
            <NuxtTime
              class="flex-1"
              :datetime="modelValue"
              day="numeric"
              month="long"
              year="numeric"
              :locale="locale"
            />

            <button
              @click.prevent.stop="modelValue = null"
              class="text-xs grid place-content-center aspect-square rounded-full hover:bg-red-50 text-red-400 p-2 -m-2"
            >
              <v-icon icon="mdi-window-close"></v-icon>
            </button>
          </template>
          <div v-else>
            {{ $t("$vuetify.datePicker.header") }}
          </div>
        </div>
      </template>

      <v-date-picker
        v-if="!disabled"
        elevation="24"
        v-model="date"
      ></v-date-picker>
    </v-menu>
    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
import { format } from "date-fns";
import { useField, ErrorMessage } from "vee-validate";
const { locale } = useI18n();
const isOpen = ref(false);

const props = defineProps({
  disabled: { type: null, default: false },
  customClass: { type: String, default: "" },
  format: { type: String, default: "" },
  rules: { type: String, default: "" },
  name: { type: String, default: "date" },
});

const field = useField(props.name, props.rules);
const date = ref("");

const modelValue = defineModel();

if (field.value.value) date.value = field.value.value;

watch(date, (v) => {
  isOpen.value = false;
  if (v) modelValue.value = format(new Date(v), props.format);
  else modelValue.value = null;
});
watch(
  modelValue,
  (v, oldValue) => {
    field.setValue(v, typeof oldValue != "undefined");
  },
  { immediate: true }
);
</script>
