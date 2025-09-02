<template>
  <v-btn
    :disabled="isLoading"
    :loading="isLoading"
    color="#865bea"
    class="mt-6 w-full"
    type="submit"
    size="large"
  >
    {{ text || $t("save") }}
  </v-btn>
</template>

<script setup>
const props = defineProps({
  text: { type: String, default: "" },
  isLoading: { type: Boolean, default: false },
});
</script>
