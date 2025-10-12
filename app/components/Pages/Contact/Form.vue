<template>
	<div class="lg:col-span-2">
		<div class="bg-white dark:!bg-gray-800 rounded-3xl p-8 shadow-xl">
			<h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
				{{ $t("contact.form.title") }}
			</h3>

			<Form v-bind="{ onSubmit }" class="space-y-6">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<InputsText
						name="name"
						rules="required"
						:placeholder="$t('contact.form.name')"
						icon="lucide:id-card"
					/>
					<InputsEmail
						name="email"
						rules="required|email"
						:placeholder="$t('contact.form.email')"
					/>
				</div>

				<InputsPhone name="phone" rules="required" :placeholder="$t('contact.form.phone')" />

				<InputsSelect
					name="subject"
					rules="required"
					:placeholder="$t('contact.form.subject')"
					:items="[
						{ value: 'booking', title: $t('contact.form.subjects.booking') },
						{ value: 'complaint', title: $t('contact.form.subjects.complaint') },
						{ value: 'suggestion', title: $t('contact.form.subjects.suggestion') },
						{ value: 'other', title: $t('contact.form.subjects.other') },
					]"
					icon="lucide:badge-info"
				/>

				<InputsTextarea
					name="message"
					rules="required"
					:placeholder="$t('contact.form.message')"
					:rows="5"
				/>

				<InputsSubmit :text="$t('contact.form.send')" :isLoading="loading" :disabled="loading" />
			</Form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
const { t } = useI18n();

// Form data
const loading = ref(false);

// Methods
const onSubmit = async (data: any, { resetForm }: any) => {
	try {
		loading.value = true;
		const res = await useApi().post("message", data);
		useToast().success(t("contact.form.success"));
	} catch (err) {
		useToast().error(t("global.error"));
	} finally {
		loading.value = false;
	}
};
</script>
