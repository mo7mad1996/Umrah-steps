<template>
  <div
    class="mx-auto max-w-4xl text-center bg-white border rounded-2xl p-12"
    v-if="error && status == 'error'"
  >
    <v-icon
      icon="mdi-alert-circle-outline"
      class="text-red-500 mb-3"
      size="100"
    />
    <h3 class="text-lg text-red-600 font-bold mb-2">
      {{ $t("global.error") }}
    </h3>
    <p class="text-sm text-zinc-700 my-4">{{ error?.message }}</p>
    <button
      v-if="refresh"
      class="flex gap-2 items-center rounded-md bg-rose-50 hover:bg-rose-100 shadow px-4 py-2 mx-auto my-4"
      @click="refresh"
    >
      <v-icon icon="mdi-reload" />
      <span>
        {{ $t("global.reload") }}
      </span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: null,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  refresh: {
    type: Function,
    required: false,
  },
});
</script>
