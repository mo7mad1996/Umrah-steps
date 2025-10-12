<template>
	<div class="space-y-8">
		<h3 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
			{{ $t("dashboard.site_settings.favorites.title") }}
		</h3>

		<!-- Hero Image Section -->
		<div class="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
			<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
				<Icon name="solar:gallery-bold" class="text-2xl text-purple-600" />
				{{ $t("dashboard.site_settings.favorites.hero_image") }}
			</h4>
			<Form @submit="updateHeroImage">
				<div class="space-y-4">
					<InputsFile
						name="image"
						:title="$t('dashboard.site_settings.favorites.hero_image')"
						accept="image/*"
						rules="required"
					/>
					<InputsSubmit :title="$t('global.save')" class="w-full" />
				</div>
			</Form>
		</div>

		<!-- SEO Settings -->
		<div class="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
			<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
				<Icon name="solar:search-bold" class="text-2xl text-purple-600" />
				{{ $t("dashboard.site_settings.favorites.seo_settings") }}
			</h4>
			<Form @submit="updateSEO">
				<div class="grid md:grid-cols-2 gap-6">
					<InputsText
						name="seo.title.ar"
						:title="$t('dashboard.site_settings.favorites.seo.title_ar')"
						rules="required"
						icon="solar:title-bold"
					/>
					<InputsText
						name="seo.title.en"
						:title="$t('dashboard.site_settings.favorites.seo.title_en')"
						rules="required"
						icon="solar:title-bold"
					/>
					<InputsTextarea
						name="seo.description.ar"
						:title="$t('dashboard.site_settings.favorites.seo.description_ar')"
						:rows="3"
						rules="required"
					/>
					<InputsTextarea
						name="seo.description.en"
						:title="$t('dashboard.site_settings.favorites.seo.description_en')"
						:rows="3"
						rules="required"
					/>
				</div>
				<div class="mt-4">
					<InputsSubmit :title="$t('global.save')" class="w-full" />
				</div>
			</Form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';

const { t } = useI18n();

const updateHeroImage = async (values: any) => {
	try {
		await useApi().put('/page-content/favorites', {
			content: {
				image: values.image
			}
		});
		useToast().success(t('dashboard.site_settings.success_update'));
	} catch (error) {
		useToast().error(t('dashboard.site_settings.error'));
	}
};

const updateSEO = async (values: any) => {
	try {
		await useApi().put('/page-content/favorites', values);
		useToast().success(t('dashboard.site_settings.success_update'));
	} catch (error) {
		useToast().error(t('dashboard.site_settings.error'));
	}
};
</script>
