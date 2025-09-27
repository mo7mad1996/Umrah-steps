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
  { immediate: true },
);

const country_codeValue = computed(() => {
  return country_code.value?.value || undefined;
});
</script>

<style lang="scss">
.v-window .vue-tel-input .vti__dropdown-list {
  height: 150px;
}

*:has(> .vti__input.vti__search_box) {
  @apply sticky top-0 p-1;
}
.vti__input.vti__search_box {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  border-radius: 10px;
  padding: 0.2em 1em;

  @apply bg-white dark:!bg-gray-700 border !border-gray-200 dark:!border-gray-600 dark:text-blue-400;
}

.vue-tel-input {
  border: none !important;
  @apply flex gap-2 relative;

  &:focus-within {
    box-shadow: none !important;
    border-color: #e0e0e0;
  }

  input.vti__input.vti__phone {
    @apply flex-1 p-2 px-2 md:!px-4 !border !border-solid !border-gray-200  rounded-2xl outline-none bg-white max-md:placeholder:text-sm max-md:placeholder:rtl:text-right  dark:!border-gray-600  dark:!bg-gray-700;
  }

  .vti__dropdown {
    @apply p-0 text-sm items-stretch static;
  }
  .vti__dropdown .vti__selection {
    @apply py-2 px-1  md:!px-4 rounded-2xl border h-full !border-gray-200 flex items-center gap-1 md:gap-2 text-neutral-400 bg-white  dark:!border-gray-600  dark:!bg-gray-700 dark:text-white;

    & .vti__country-code,
    & .vti__dropdown-arrow {
      color: inherit;
    }
  }

  .vti__dropdown-list {
    &.below {
      top: 100%;
      width: 100%;
      left: 0;
    }
    &.above {
      bottom: 100%;
      width: 100%;
      left: 0;
    }
  }

  &.disabled {
    .vti__input.vti__phone,
    .vti__dropdown .vti__selection {
      @apply bg-neutral-200 cursor-not-allowed;
    }
  }
}

.vti__dropdown:hover,
.vti__dropdown.open {
  background-color: transparent !important;
}

// vue tel input
.vue-tel-input {
  direction: ltr !important;

  &:not(::placeholder) {
    direction: unset !important   ;
  }
}
</style>
