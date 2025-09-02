<template>
  <div>
    <client-only>
      <template #fallback>
        <div class="flex gap-2 h-12" style="direction: ltr">
          <div
            class="col-span-1 w-24 bg-neutral-100 rounded-2xl animate-pulse"
          ></div>
          <div
            class="col-span-full bg-neutral-100 h-full flex-1 rounded-2xl animate-pulse"
          ></div>
        </div>
      </template>

      <VueTelInput
        :validCharactersOnly="true"
        :ignoredCountries="['il']"
        :disabled="!!disabled"
        :invalidMsg="$t('auth.validation.phone')"
        :defaultCountry="country_codeValue || undefined"
        v-model="modelValue"
        :inputOptions="{
          required: true,
          tabindex: 0,
          placeholder: placeholder,
        }"
        @countryChanged="
          (v) => {
            if (onCountryChanged) return onCountryChanged(v);
            country_code.setValue(`+${v.dialCode}`, false);
          }
        "
        :dropdownOptions="{
          showDialCode: true,
          showFlags: true,
          showDialCodeInSelection: true,
          showSearchBox: true,
          searchBoxPlaceholder: `${$t('global.search')}...`,
          tabindex: 1,
        }"
        mode="international"
      />

      <ErrorMessage :name="name" />
    </client-only>
  </div>
</template>

<script setup>
// @ts-ignore
import * as pkg from "vue-tel-input";
const { VueTelInput } = pkg;

import { ErrorMessage, useField } from "vee-validate";

const props = defineProps({
  name: { type: String, default: "mobile" },
  rules: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  disabled: { type: null, default: false },
  onCountryChanged: { type: null, default: false },
  country_code: { type: String, default: "" },
});

const country_code = useField("country_code", "");
country_code.setValue(props.country_code, false);

const mobile = useField(props.name, props.rules);

const modelValue = defineModel();

if (mobile.value.value) modelValue.value = mobile.value.value;

watch(
  modelValue,
  (v, oldValue) => {
    if (oldValue != v)
      if (typeof oldValue == typeof v || v) mobile.setValue(v, true);
  },
  { immediate: true }
);

const country_codeValue = computed(() => {
  return country_code.value?.value || undefined;
});
</script>
r
