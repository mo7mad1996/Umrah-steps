<template>
	<div class="space-y-8">
		<h3 class="between-lines text-gray-700 dark:text-gray-300 text-3xl my-6 text-center font-bold">
			{{ $t("global.user_agreement.title") }}
		</h3>
		<section
			v-if="PageContentStatus == 'success'"
			class="rounded-lg backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 my-4 dark:border-gray-700/20 p-6 shadow-xl"
		>
			<Form
				v-bind="{ onSubmit: updatePageContent, initialValues: pageContent }"
				v-slot="{ isSubmitting }"
			>
				<div class="grid gap-4 md:grid-cols-2">
					<InputsContentEditor
						name="content.body.ar"
						:title="$t('dashboard.site_settings.body_ar')"
						:placeholder="$t('dashboard.site_settings.body_ar')"
					/>
					<InputsContentEditor
						name="content.body.en"
						:title="$t('dashboard.site_settings.body_en')"
						:placeholder="$t('dashboard.site_settings.body_en')"
					/>
				</div>
				<InputsSubmit :is-loading="isSubmitting" />
			</Form>
		</section>

		<section v-if="PageContentStatus == 'success'">
			<!-- SEO Settings -->
			<div
				class="rounded-lg backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl"
			>
				<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
					<Icon name="material-symbols:search-rounded" class="text-xl" />
					{{ $t("dashboard.site_settings.favorites.seo_settings") }}
				</h4>
				<Form v-bind="{ onSubmit: updatePageContent, initialValues: pageContent }">
					<div class="grid md:grid-cols-2 gap-6">
						<InputsText
							name="seo.keywords.ar"
							:title="$t('dashboard.site_settings.seo_keywords_ar')"
							icon="material-symbols:keyboard-external-input-outline-rounded"
						/>
						<InputsText
							name="seo.keywords.en"
							:title="$t('dashboard.site_settings.seo_keywords_en')"
							icon="material-symbols:keyboard-external-input-outline-rounded"
						/>
						<InputsText
							name="seo.description.ar"
							:title="$t('dashboard.site_settings.seo_description_ar')"
							icon="material-symbols:chat-info"
						/>
						<InputsText
							name="seo.description.en"
							:title="$t('dashboard.site_settings.seo_description_en')"
							icon="material-symbols:chat-info"
						/>
					</div>
					<div class="mt-4">
						<InputsSubmit :title="$t('global.save')" class="w-full" />
					</div>
				</Form>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
const imgRef = ref<any>();
const { t } = useI18n();

const { data: pageContent, status: PageContentStatus } = usePageContent(PagesEnum.PRIVACY_POLICY);

const updatePageContent = async (values: any) => {
	try {
		await useApi().put("/page-content/privacy_policy", values);
		useToast().success(t("dashboard.site_settings.success_update"));
	} catch (error) {
		useToast().error(t("dashboard.site_settings.error"));
	}
};
</script>
