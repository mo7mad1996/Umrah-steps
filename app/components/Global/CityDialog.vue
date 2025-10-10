<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="dark:bg-gray-800">
      <v-card-title class="text-h6 dark:text-white">
        {{ isEdit ? $t('cities.edit_city') : $t('cities.add_city') }}
      </v-card-title>

      <v-card-text class="pt-4">
        <Form @submit="handleSubmit" ref="formRef">
          <div class="space-y-4">
            <InputsText
              v-model="form.name.ar"
              :title="$t('cities.name_ar')"
              name="name.ar"
              icon="mdi:city"
              rules="required"
            />
            <InputsText
              v-model="form.name.en"
              :title="$t('cities.name_en')"
              name="name.en"
              icon="mdi:city"
              rules="required"
            />
          </div>

          <v-card-actions class="px-0 pb-0 pt-4">
            <v-spacer />
            <v-btn
              variant="text"
              @click="handleCancel"
              :disabled="loading"
              class="dark:text-gray-300"
              type="button"
            >
              {{ $t('global.cancel') }}
            </v-btn>
            <v-btn
              color="primary"
              variant="flat"
              type="submit"
              :loading="loading"
            >
              {{ $t('global.save') }}
            </v-btn>
          </v-card-actions>
        </Form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';

interface Props {
  modelValue: boolean;
  city?: any;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  city: null,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'saved': [city: any];
}>();

const { t } = useI18n();
const { createCity, updateCity } = useCity();
const { showToast } = useToast();

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const formRef = ref();
const loading = ref(false);
const isEdit = computed(() => !!props.city);

const form = ref({
  name: {
    ar: '',
    en: '',
  },
});

const resetForm = () => {
  form.value = {
    name: {
      ar: '',
      en: '',
    },
  };
};

const handleCancel = () => {
  resetForm();
  dialog.value = false;
};

const handleSubmit = async (values: any) => {
  loading.value = true;
  try {
    let savedCity;
    if (isEdit.value) {
      savedCity = await updateCity(props.city._id, form.value);
      showToast(t('cities.updated'), 'success');
    } else {
      savedCity = await createCity(form.value);
      showToast(t('cities.created'), 'success');
    }
    emit('saved', savedCity);
    resetForm();
    dialog.value = false;
  } catch (error: any) {
    showToast(error.message || t('cities.error'), 'error');
  } finally {
    loading.value = false;
  }
};

watch(() => props.city, (newCity) => {
  if (newCity) {
    form.value = {
      name: {
        ar: newCity.name.ar,
        en: newCity.name.en,
      },
    };
  } else {
    resetForm();
  }
}, { immediate: true });
</script>
