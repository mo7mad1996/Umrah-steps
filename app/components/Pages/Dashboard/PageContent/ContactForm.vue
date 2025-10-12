<template>
	<div class="space-y-8">
		<h3 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
			{{ $t("dashboard.site_settings.contact.title") }}
		</h3>

		<!-- Main Phone Number -->
		<div class="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
			<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
				<Icon name="solar:phone-bold" class="text-2xl text-purple-600" />
				{{ $t("dashboard.site_settings.contact.main_phone") }}
			</h4>
			<Form @submit="updateMainPhone">
				<div class="space-y-4">
					<InputsText
						name="mainPhone"
						:title="$t('dashboard.site_settings.contact.main_phone')"
						:placeholder="$t('dashboard.site_settings.contact.main_phone_placeholder')"
						rules="required"
						icon="solar:phone-bold"
					/>
					<InputsSubmit :title="$t('global.save')" class="w-full" />
				</div>
			</Form>
		</div>

		<!-- Hero Image Section -->
		<div class="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
			<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
				<Icon name="solar:gallery-bold" class="text-2xl text-purple-600" />
				{{ $t("dashboard.site_settings.contact.hero_image") }}
			</h4>
			<Form @submit="updateHeroImage">
				<div class="space-y-4">
					<InputsFile
						name="image"
						:title="$t('dashboard.site_settings.contact.hero_image')"
						accept="image/*"
						rules="required"
					/>
					<InputsSubmit :title="$t('global.save')" class="w-full" />
				</div>
			</Form>
		</div>

		<!-- Contact Info Section -->
		<details open class="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
			<summary class="cursor-pointer text-gray-900 dark:text-white text-xl font-bold flex items-center justify-between mb-4">
				<span class="flex items-center gap-2">
					<Icon name="solar:phone-calling-bold" class="text-2xl text-purple-600" />
					{{ $t("dashboard.site_settings.contact.contact_info.title") }}
				</span>
				<GlobalFormDialog
					:title="$t('dashboard.site_settings.contact.contact_info.title')"
					max-width="950"
					@submit="addContactInfo"
				>
					<template #btn="props">
						<button
							v-bind="props"
							type="button"
							class="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-all"
						>
							<Icon name="mdi:plus" class="text-xl" />
						</button>
					</template>
					<div class="grid md:grid-cols-2 gap-6 p-2">
						<InputsText
							:title="$t('dashboard.site_settings.contact.contact_info.name_ar')"
							:placeholder="$t('dashboard.site_settings.contact.contact_info.name_ar')"
							name="name.ar"
							rules="required"
							icon="solar:user-bold"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.contact_info.name_en')"
							:placeholder="$t('dashboard.site_settings.contact.contact_info.name_en')"
							name="name.en"
							rules="required"
							icon="solar:user-bold"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.contact_info.description_ar')"
							:placeholder="$t('dashboard.site_settings.contact.contact_info.description_ar')"
							name="description.ar"
							rules="required"
							icon="solar:document-text-bold"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.contact_info.description_en')"
							:placeholder="$t('dashboard.site_settings.contact.contact_info.description_en')"
							name="description.en"
							rules="required"
							icon="solar:document-text-bold"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.contact_info.url')"
							:placeholder="$t('dashboard.site_settings.contact.contact_info.url_placeholder')"
							name="url"
							rules="required"
							icon="solar:link-bold"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.contact_info.icon')"
							:placeholder="$t('dashboard.site_settings.contact.contact_info.icon_placeholder')"
							name="icon"
							rules="required"
							icon="solar:star-bold"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.contact_info.color')"
							name="color"
							type="color"
							rules="required"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.contact_info.order')"
							name="order"
							type="number"
							icon="solar:sort-bold"
						/>
					</div>
				</GlobalFormDialog>
			</summary>

			<GlobalInfinityTable
				class="!h-64"
				:finished="true"
				:refresh="refreshContactInfo"
				:data="contactInfos"
				:error="contactInfoError"
				:page="1"
				:status="contactInfoStatus"
				:headers="[
					{ title: 'dashboard.site_settings.contact.contact_info.name_' + locale, key: 'name' },
					{ title: 'dashboard.site_settings.contact.contact_info.url', key: 'url' },
					{ title: '', key: 'action' },
				]"
			>
				<template #action="{ row }">
					<div
						class="h-full flex items-center justify-end group-hover:!opacity-100 opacity-0"
						@click.prevent.stop
					>
						<GlobalConfirmDialog
							:title="$t('global.delete')"
							:content="$t('global.delete_question')"
							@confirm="() => deleteContactInfoItem(row.id)"
						>
							<template v-slot="props">
								<button
									@click.prevent.stop
									v-bind="props"
									class="aspect-square block h-full hover:bg-blue-600/10 rounded-full hover:shadow text-red-600"
								>
									<Icon name="material-symbols:delete-outline" class="h-full" />
								</button>
							</template>
						</GlobalConfirmDialog>
					</div>
				</template>
			</GlobalInfinityTable>
		</details>

		<!-- FAQs Section -->
		<details open class="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
			<summary class="cursor-pointer text-gray-900 dark:text-white text-xl font-bold flex items-center justify-between mb-4">
				<span class="flex items-center gap-2">
					<Icon name="solar:question-circle-bold" class="text-2xl text-purple-600" />
					{{ $t("dashboard.site_settings.contact.faq.title") }}
				</span>
				<GlobalFormDialog
					:title="$t('dashboard.site_settings.contact.faq.title')"
					max-width="950"
					@submit="addFaq"
				>
					<template #btn="props">
						<button
							v-bind="props"
							type="button"
							class="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-all"
						>
							<Icon name="mdi:plus" class="text-xl" />
						</button>
					</template>
					<div class="grid md:grid-cols-2 gap-6 p-2">
						<InputsText
							:title="$t('dashboard.site_settings.contact.faq.question.ar')"
							:placeholder="$t('dashboard.site_settings.contact.faq.question.ar')"
							name="question.ar"
							rules="required"
							icon="material-symbols:question-mark-rounded"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.faq.question.en')"
							:placeholder="$t('dashboard.site_settings.contact.faq.question.en')"
							name="question.en"
							rules="required"
							icon="material-symbols:question-mark-rounded"
						/>

						<InputsTextarea
							:rows="5"
							name="answer.ar"
							rules="required"
							:title="$t('dashboard.site_settings.contact.faq.answer.ar')"
							:placeholder="$t('dashboard.site_settings.contact.faq.answer.ar')"
						/>

						<InputsTextarea
							:rows="5"
							name="answer.en"
							rules="required"
							:title="$t('dashboard.site_settings.contact.faq.answer.en')"
							:placeholder="$t('dashboard.site_settings.contact.faq.answer.en')"
						/>
					</div>
				</GlobalFormDialog>
			</summary>

			<GlobalInfinityTable
				class="!h-64"
				:finished="true"
				:refresh="refreshFaq"
				:data="faqs"
				:error="faqsError"
				:page="1"
				:status="faqsStatus"
				:headers="[
					{ title: 'dashboard.site_settings.contact.faq.question.' + locale, key: 'question' },
					{ title: 'dashboard.site_settings.contact.faq.answer.' + locale, key: 'answer' },
					{ title: '', key: 'action' },
				]"
			>
				<template #action="{ row }">
					<div
						class="h-full flex items-center justify-end group-hover:!opacity-100 opacity-0"
						@click.prevent.stop
					>
						<GlobalConfirmDialog
							:title="$t('global.delete')"
							:content="$t('global.delete_question')"
							@confirm="() => deleteQuestion(row.id)"
						>
							<template v-slot="props">
								<button
									@click.prevent.stop
									v-bind="props"
									class="aspect-square block h-full hover:bg-blue-600/10 rounded-full hover:shadow text-red-600"
								>
									<Icon name="material-symbols:delete-outline" class="h-full" />
								</button>
							</template>
						</GlobalConfirmDialog>
					</div>
				</template>
			</GlobalInfinityTable>
		</details>

		<!-- Work Hours Section -->
		<details open class="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
			<summary class="cursor-pointer text-gray-900 dark:text-white text-xl font-bold flex items-center justify-between mb-4">
				<span class="flex items-center gap-2">
					<Icon name="solar:clock-circle-bold" class="text-2xl text-purple-600" />
					{{ $t("contact.info.hours") }}
				</span>

				<GlobalFormDialog @submit="addWorkHours" max-width="950" :title="$t('contact.info.hours')">
					<template #btn="props">
						<button
							v-bind="props"
							type="button"
							class="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-all"
						>
							<Icon name="mdi:plus" class="text-xl" />
						</button>
					</template>

					<div class="grid md:grid-cols-2 gap-6 p-2">
						<InputsText
							:title="$t('dashboard.site_settings.contact.hours.title.ar')"
							:placeholder="$t('dashboard.site_settings.contact.hours.title.ar')"
							name="day.ar"
							rules="required"
							icon="tabler:clock-hour-4"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.hours.title.en')"
							:placeholder="$t('dashboard.site_settings.contact.hours.title.en')"
							name="day.en"
							rules="required"
							icon="tabler:clock-hour-4"
						/>

						<InputsText
							:title="$t('dashboard.site_settings.contact.hours.answer.ar')"
							:placeholder="$t('dashboard.site_settings.contact.hours.answer.ar')"
							name="time.ar"
							rules="required"
							icon="tabler:clock-hour-4"
						/>
						<InputsText
							:title="$t('dashboard.site_settings.contact.hours.answer.en')"
							:placeholder="$t('dashboard.site_settings.contact.hours.answer.en')"
							name="time.en"
							rules="required"
							icon="tabler:clock-hour-8"
						/>
					</div>
				</GlobalFormDialog>
			</summary>

			<GlobalInfinityTable
				:finished="true"
				:refresh="refreshWorkHours"
				:data="workHours"
				:error="workHoursError"
				:page="1"
				:status="workHoursStatus"
				:headers="[
					{ title: 'dashboard.site_settings.contact.hours.title.' + locale, key: 'day' },
					{ title: 'dashboard.site_settings.contact.hours.answer.' + locale, key: 'time' },
					{ title: '', key: 'action' },
				]"
			>
				<template #action="{ row }">
					<div
						class="h-full flex items-center justify-end group-hover:!opacity-100 opacity-0"
						@click.prevent.stop
					>
						<GlobalConfirmDialog
							:title="$t('global.delete')"
							:content="$t('global.delete_question')"
							@confirm="() => deleteWorkHours(row.id)"
						>
							<template v-slot="props">
								<button
									@click.prevent.stop
									v-bind="props"
									class="aspect-square block h-full hover:bg-blue-600/10 rounded-full hover:shadow text-red-600"
								>
									<Icon name="material-symbols:delete-outline" class="h-full" />
								</button>
							</template>
						</GlobalConfirmDialog>
					</div>
				</template>
			</GlobalInfinityTable>
		</details>

		<!-- Messages Section -->
		<details open class="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
			<summary class="cursor-pointer text-gray-900 dark:text-white text-xl font-bold flex items-center gap-2 mb-4">
				<Icon name="solar:letter-bold" class="text-2xl text-purple-600" />
				{{ $t("dashboard.site_settings.contact.message.title") }}
			</summary>

			<GlobalInfinityTable
				class="max-h-22 overflow-auto"
				:finished="true"
				:refresh="refreshMessages"
				:data="messages"
				:error="messagesError"
				:page="1"
				:status="messagesStatus"
				:headers="[]"
			>
				<template #default="{ item }">
					<label
						:class="color[item.subject as 'complaint' | 'booking'  | 'suggestion' | 'other']"
						class="group cursor-pointer border-0 my-2 shadow !border-s-8 has-[:checked]:!bg-neutral-200 grid gap-4 md:grid-cols-4 p-2 px-4 hover:bg-gray-300/40 dark:hover:bg-gray-100/10 rounded-2xl"
					>
						<h1 class="flex items-center gap-2">
							<GlobalConfirmDialog
								:title="$t('global.delete')"
								:content="$t('global.delete_question')"
								@confirm="() => deleteMessages(item.id)"
							>
								<template v-slot="props">
									<div
										@click.prevent.stop
										v-bind="props"
										class="aspect-square w-8 flex items-center justify-center hover:bg-blue-600/10 rounded-full hover:shadow text-red-600"
									>
										<Icon name="material-symbols:delete-outline" />
									</div>
								</template>
							</GlobalConfirmDialog>

							<span>
								{{ $t("contact.form.subjects." + item.subject) }}
							</span>
						</h1>
						<div class="md:col-span-2">
							<h3 class="text-lg font-semibold">{{ item.name }}</h3>
							<div class="text-sm text-gray-500">
								<a
									:href="`mailto:${item.email}`"
									class="rounded-lg hover:text-indigo-500 hover:underline px-2 py-1"
									target="_blank"
									>{{ item.email }}</a
								>
								-
								<a
									class="rounded-full hover:text-indigo-500 hover:underline px-2 py-1"
									:href="`tel:${item.phone}`"
									target="_blank"
								>
									{{ item.phone }}
								</a>
							</div>
						</div>
						<div class="text-sm text-gray-500 flex flex-col">
							<nuxt-time :locale="locale" :datetime="item.createdAt" relative />
							<nuxt-time
								:locale="locale"
								:datetime="item.createdAt"
								hour="2-digit"
								minute="2-digit"
								hour12
								day="2-digit"
								year="numeric"
								month="short"
							/>
						</div>
						<pre
							class="md:col-span-4 hidden has-[:checked]:block has-[:checked]:!bg-neutral-50 dark:has-[:checked]:!bg-gray-800 p-4 rounded-2xl shadow">{{ item.message }}<input class="hidden" type="checkbox" /></pre>
					</label>
				</template>
			</GlobalInfinityTable>
		</details>
	</div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';

const { t, locale } = useI18n();

// Update Main Phone
const updateMainPhone = async (values: any) => {
	try {
		await useApi().put('/page-content/contact', {
			content: {
				mainPhone: values.mainPhone
			}
		});
		useToast().success(t('dashboard.site_settings.success_update'));
	} catch (error) {
		useToast().error(t('dashboard.site_settings.error'));
	}
};

// Contact Info
const {
	data: contactInfos,
	status: contactInfoStatus,
	error: contactInfoError,
	refresh: refreshContactInfo,
} = useAsyncData(
	"contactInfo",
	() =>
		useApi()
			.get("/contactInfo")
			.then((d) => d.data),
	{ watch: [locale] },
);

const deleteContactInfoItem = async (id: number) => {
	await useApi().delete(`contactInfo?id=${id}`);
	useToast().success(t("dashboard.site_settings.success_delete"));
	await refreshContactInfo();
};

const addContactInfo = async (data: any) => {
	await useApi().post("contactInfo", data);
	await refreshContactInfo();
	useToast().success(t("dashboard.site_settings.success_update"));
};

// Update Hero Image
const updateHeroImage = async (values: any) => {
	try {
		await useApi().put('/page-content/contact', {
			content: {
				image: values.image
			}
		});
		useToast().success(t('dashboard.site_settings.success_update'));
	} catch (error) {
		useToast().error(t('dashboard.site_settings.error'));
	}
};

// FAQs
const {
	data: faqs,
	status: faqsStatus,
	error: faqsError,
	refresh: refreshFaq,
} = useAsyncData(
	"faq",
	() =>
		useApi()
			.get("/faqs")
			.then((d) => d.data),
	{ watch: [locale] },
);

const deleteQuestion = async (id: number) => {
	await useApi().delete(`faqs?id=${id}`);
	useToast().success(t("dashboard.site_settings.success_delete"));
	await refreshFaq();
};

const addFaq = async (data: any) => {
	await useApi().post("faqs", data);
	await refreshFaq();
	useToast().success(t("dashboard.site_settings.success_update"));
};

// Work Hours
const {
	data: workHours,
	status: workHoursStatus,
	error: workHoursError,
	refresh: refreshWorkHours,
} = useAsyncData(
	"workHours",
	() =>
		useApi()
			.get("workHours")
			.then((d) => d.data),
	{ watch: [locale] },
);

const deleteWorkHours = async (id: number) => {
	await useApi().delete(`workHours?id=${id}`);
	useToast().success(t("dashboard.site_settings.success_delete"));
	await refreshWorkHours();
};

const addWorkHours = async (data: any) => {
	await useApi().post("workHours", data);
	await refreshWorkHours();
	useToast().success(t("dashboard.site_settings.success_update"));
};

// Messages
const color = {
	booking: "!border-indigo-500",
	complaint: "!border-rose-500",
	suggestion: "!border-accent",
	other: "!border-lime-500",
};

const {
	data: messages,
	status: messagesStatus,
	error: messagesError,
	refresh: refreshMessages,
} = useAsyncData("messages", () =>
	useApi()
		.get("message")
		.then((d) => d.data),
);

const deleteMessages = async (id: number) => {
	await useApi().delete(`messages?id=${id}`);
	useToast().success(t("dashboard.site_settings.success_delete"));
	await refreshMessages();
};
</script>
