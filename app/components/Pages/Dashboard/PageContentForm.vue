<template>
  <div>
    <GlobalLoading v-if="loading" />
    <v-form v-else ref="formRef" @submit.prevent="handleSubmit">
      <div class="space-y-8">
        <section>
          <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Icon name="mdi:search-web" />
            {{ $t('site_settings.seo_section') }}
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <InputsText
              v-model="form.seo.title.ar"
              :label="$t('site_settings.seo_title_ar')"
              name="seo.title.ar"
              icon="mdi:format-title"
            />
            <InputsText
              v-model="form.seo.title.en"
              :label="$t('site_settings.seo_title_en')"
              name="seo.title.en"
              icon="mdi:format-title"
            />
            <InputsTextarea
              v-model="form.seo.description.ar"
              :label="$t('site_settings.seo_description_ar')"
              name="seo.description.ar"
              :rows="3"
            />
            <InputsTextarea
              v-model="form.seo.description.en"
              :label="$t('site_settings.seo_description_en')"
              name="seo.description.en"
              :rows="3"
            />
            <InputsText
              v-model="form.seo.keywords.ar"
              :label="$t('site_settings.seo_keywords_ar')"
              name="seo.keywords.ar"
              icon="mdi:tag"
            />
            <InputsText
              v-model="form.seo.keywords.en"
              :label="$t('site_settings.seo_keywords_en')"
              name="seo.keywords.en"
              icon="mdi:tag"
            />
          </div>
        </section>

        <hr class="dark:border-gray-700" />

        <section>
          <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Icon name="mdi:text" />
            {{ $t('site_settings.content_section') }}
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <InputsText
              v-model="form.content.heading.ar"
              :label="$t('site_settings.heading_ar')"
              name="content.heading.ar"
              icon="mdi:format-header-1"
            />
            <InputsText
              v-model="form.content.heading.en"
              :label="$t('site_settings.heading_en')"
              name="content.heading.en"
              icon="mdi:format-header-1"
            />
            <InputsText
              v-model="form.content.subheading.ar"
              :label="$t('site_settings.subheading_ar')"
              name="content.subheading.ar"
              icon="mdi:format-header-2"
            />
            <InputsText
              v-model="form.content.subheading.en"
              :label="$t('site_settings.subheading_en')"
              name="content.subheading.en"
              icon="mdi:format-header-2"
            />
          </div>

          <div class="grid md:grid-cols-2 gap-4 mt-4">
            <InputsTextarea
              v-model="form.content.body.ar"
              :label="$t('site_settings.body_ar')"
              name="content.body.ar"
              :rows="6"
            />
            <InputsTextarea
              v-model="form.content.body.en"
              :label="$t('site_settings.body_en')"
              name="content.body.en"
              :rows="6"
            />
          </div>
        </section>

        <hr class="dark:border-gray-700" />

        <section>
          <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Icon name="mdi:image" />
            {{ $t('site_settings.images_section') }}
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <InputsFile
              ref="mainImage"
              path="pages"
              accept="image/*"
              name="content.image"
              :title="$t('site_settings.main_image')"
            />
            <InputsFile
              ref="images"
              accept="image/*"
              path="pages"
              multiple
              name="content.images"
              :title="$t('site_settings.additional_images')"
            />
          </div>
        </section>

        <div class="flex justify-end gap-4">
          <v-btn
            variant="outlined"
            @click="loadPageContent"
            :disabled="submitting"
          >
            {{ $t('global.reset') }}
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="submitting"
          >
            {{ $t('global.save') }}
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  page: string;
}

const props = defineProps<Props>();
const { t } = useI18n();
const { showToast } = useToast();
const { $axios } = useNuxtApp();

const loading = ref(true);
const submitting = ref(false);
const formRef = ref();
const mainImage = ref();
const images = ref();

const form = ref({
  seo: {
    title: { ar: '', en: '' },
    description: { ar: '', en: '' },
    keywords: { ar: '', en: '' },
  },
  content: {
    heading: { ar: '', en: '' },
    subheading: { ar: '', en: '' },
    body: { ar: '', en: '' },
    image: '',
    images: [],
  },
});

const loadPageContent = async () => {
  loading.value = true;
  try {
    const response = await $axios.get(`/api/page-content/${props.page}`);
    if (response.data.success && response.data.data) {
      const data = response.data.data;
      form.value = {
        seo: data.seo || form.value.seo,
        content: data.content || form.value.content,
      };
    }
  } catch (error) {
    console.error('Error loading page content:', error);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  submitting.value = true;
  try {
    const data = { ...form.value };

    if (mainImage.value?.files?.length) {
      data.content.image = (await mainImage.value.uploadFiles())[0];
    }
    if (images.value?.files?.length) {
      data.content.images = [
        ...data.content.images,
        ...(await images.value.uploadFiles()),
      ];
    }

    const response = await $axios.put(`/api/page-content/${props.page}`, data);

    if (response.data.success) {
      showToast(t('site_settings.success_update'), 'success');
    }
  } catch (error: any) {
    console.error('Error updating page content:', error);
    showToast(t('site_settings.error'), 'error');
  } finally {
    submitting.value = false;
  }
};

watch(() => props.page, () => {
  loadPageContent();
});

onMounted(() => {
  loadPageContent();
});
</script>
