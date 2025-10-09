<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="dark:bg-gray-800">
      <v-card-title class="text-h6 bg-red-50 dark:bg-red-900/20 dark:text-white">
        <div class="flex items-center gap-2">
          <Icon name="mdi:alert-circle" class="text-red-500" size="24" />
          <span>{{ title }}</span>
        </div>
      </v-card-title>

      <v-card-text class="pt-6 pb-4 dark:text-gray-200">
        <p class="text-base">{{ message }}</p>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn
          variant="text"
          @click="handleCancel"
          :disabled="loading"
          class="dark:text-gray-300"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          color="error"
          variant="flat"
          @click="handleConfirm"
          :loading="loading"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  loading: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'confirm': [];
  'cancel': [];
}>();

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
  dialog.value = false;
};
</script>
