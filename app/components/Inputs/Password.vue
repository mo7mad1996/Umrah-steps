<template>
  <div class="my-6">
    <div
      class="flex gap-2 md:gap-4 border !border-gray-200 p-2 px-4 rounded-2xl items-center"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 16 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 14C5 13.4477 5.44772 13 6 13H6.00717C6.55946 13 7.00717 13.4477 7.00717 14C7.00717 14.5523 6.55946 15 6.00717 15H6C5.44772 15 5 14.5523 5 14Z"
          fill="#929A9F"
        />
        <path
          d="M8.99283 14C8.99283 13.4477 9.44054 13 9.99283 13H10C10.5523 13 11 13.4477 11 14C11 14.5523 10.5523 15 10 15H9.99283C9.44054 15 8.99283 14.5523 8.99283 14Z"
          fill="#929A9F"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 0.25C5.10051 0.25 2.75 2.6005 2.75 5.5V8.29907C1.21293 9.71528 0.25 11.7452 0.25 14C0.25 18.2802 3.71979 21.75 8 21.75C12.2802 21.75 15.75 18.2802 15.75 14C15.75 11.7452 14.7871 9.71528 13.25 8.29907V5.5C13.25 2.6005 10.8995 0.25 8 0.25ZM11.75 7.21604V5.5C11.75 3.42893 10.0711 1.75 8 1.75C5.92893 1.75 4.25 3.42893 4.25 5.5V7.21604C5.36123 6.60047 6.63969 6.25 8 6.25C9.36031 6.25 10.6388 6.60047 11.75 7.21604ZM8 7.75C4.54822 7.75 1.75 10.5482 1.75 14C1.75 17.4518 4.54822 20.25 8 20.25C11.4518 20.25 14.25 17.4518 14.25 14C14.25 10.5482 11.4518 7.75 8 7.75Z"
          fill="#929A9F"
        />
      </svg>

      <Field
        class="flex-1 outline-none max-md:placeholder:text-sm"
        :rules="rules"
        :name="name"
        :type="show ? 'text' : type"
        :placeholder="placeholder"
        :validateOnInput="true"
        v-model="modelValue"
      />

      <button @click="show = !show" type="button">
        <v-icon v-if="show" icon="mdi-eye-off-outline" color="#929A9F" />
        <v-icon v-else icon="mdi-eye-outline" color="#929A9F" />
      </button>
    </div>

    <ErrorMessage :name="name" />
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate"

const props = withDefaults(
  defineProps<{
    rules?: string
    type?: string
    name?: string
    placeholder?: string
  }>(),
  { rules: "password", type: "password", name: "password" }
)

const modelValue = defineModel<string>()

const show = ref(false)
</script>
