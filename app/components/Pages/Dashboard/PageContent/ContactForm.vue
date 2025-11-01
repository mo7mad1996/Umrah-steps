<template>
	<div class="flex flex-col gap-4">
		<h3 class="between-lines text-gray-700 dark:text-gray-300 text-3xl my-6 text-center font-bold">
			{{ $t("dashboard.site_settings.contact.title") }}
		</h3>
		<section class="grid md:grid-cols-2 gap-6" v-if="PageContentStatus == 'success'">
			<!-- Hero Image Section -->
			<div
				class="rounded-lg backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-6 shadow-xl"
			>
				<h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
					<Icon name="solar:gallery-bold" class="text-xl" />
					{{ $t("dashboard.site_settings.favorites.hero_image") }}
				</h4>
				<Form
					v-bind="{
						onSubmit: async (d) => {
							const url = await imgRef.uploadFiles?.call();
							d.content.image = url[0];
							await updatePageContent(d);
						},
						initialValues: pageContent,
					}"
				>
					<div class="space-y-4">
						<InputsFile
							ref="imgRef"
							name="content.image"
							:title="$t('dashboard.site_settings.favorites.hero_image')"
							accept="image/*"
							path="backgrounds"
						/>
						<InputsSubmit :title="$t('global.save')" class="w-full" />
					</div>
				</Form>
			</div>

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

		<div class="grid md:grid-cols-2 gap-6">
			<!-- global data -->
			<Form
				v-if="globalDataStatus == 'success'"
				v-slot="{ isSubmitting, values }"
				v-bind="{
					onSubmit: async (v) => {
						v.commercial_registration = (await commercial_registrationRef.uploadFiles?.call())[0];
						await updateMainPhone(v);
					},
					initialValues: globalData,
				}"
				class="backdrop-blur-xl rounded-lg bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-4 gap-4 flex flex-col shadow-xl"
			>
				<h2
					class="block text-xl p-4 font-medium text-gray-700 dark:text-gray-300 mb-2 dark:bg-white/20"
				>
					{{ $t("dashboard.site_settings.contact.main_data") }}
				</h2>
				<InputsEmail
					name="mainEmail"
					:placeholder="$t('dashboard.site_settings.contact.main_email')"
					:title="$t('dashboard.site_settings.contact.main_email')"
				/>
				<InputsText
					rules="url"
					name="mainWhatsapp"
					:placeholder="$t('dashboard.site_settings.contact.main_whatsapp')"
					:title="$t('dashboard.site_settings.contact.main_whatsapp')"
				/>
				<h3 class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					{{ $t("dashboard.site_settings.contact.main_phone") }}
				</h3>
				<InputsPhone
					name="mainPhone"
					:placeholder="$t('dashboard.site_settings.contact.main_phone')"
					rules="required"
				/>

				<InputsText
					name="commercial_registration_number"
					:title="$t('global.commercial_registration_number')"
					:placeholder="$t('global.commercial_registration_number')"
					icon="streamline:computer-storage-hard-disk-device-disc-drive-computer-disk-electronics-platter-turntable-raid"
				/>
				<InputsText
					name="tax_number"
					:title="$t('global.tax_number')"
					:placeholder="$t('global.tax_number')"
					icon="material-symbols:monetization-on-outline-rounded"
				/>
				<InputsText
					name="license_number"
					:title="$t('global.license_number')"
					:placeholder="$t('global.license_number')"
					icon="pajamas:license-sm"
				/>
				<InputsText
					name="commercial_registration_link"
					:title="$t('global.commercial_registration_link')"
					:placeholder="$t('global.commercial_registration_link')"
					icon="material-symbols:link-rounded"
				/>
				<InputsText
					name="activity_category"
					:title="$t('global.activity_category')"
					:placeholder="$t('global.activity_category')"
					icon="material-symbols:link-rounded"
				/>

				<InputsFile
					path="commercial_registration"
					accept="image/*"
					name="commercial_registration"
					ref="commercial_registrationRef"
					:title="$t('global.commercial_registration')"
				/>

				<InputsSubmit :loading="isSubmitting" />
			</Form>
			<div
				class="backdrop-blur-xl rounded-lg bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-2 shadow-xl"
			>
				<h3 class="text-gray-500 p-2 flex gap-2 items-center">
					{{ $t("contact.social.social_media") }}
					<GlobalFormDialog
						:title="$t('contact.social.social_media')"
						max-width="950"
						@submit="addContactInfo"
					>
						<template #btn="props">
							<button
								v-bind="props"
								type="button"
								class="rounded-full p-3 overflow-hidden after:absolute after:inset-6 hover:after:inset-0 after:transition-all relative after:backdrop-invert after:backdrop-hue-rotate-180 flex items-center hover:bg-slate-100/10"
							>
								<Icon name="mdi:plus" />
							</button>
						</template>
						<div class="grid md:grid-cols-2 gap-6 p-2">
							<inputs-text
								:title="$t('contact.social.name.ar')"
								:placeholder="$t('contact.social.name.ar')"
								name="name.ar"
								rules="required"
								icon="mingcute:flag-3-fill"
							/>
							<inputs-text
								:title="$t('contact.social.name.en')"
								:placeholder="$t('contact.social.name.en')"
								name="name.en"
								rules="required"
								icon="mingcute:flag-3-fill"
							/>

							<inputs-textarea
								:rows="3"
								name="description.ar"
								rules="required"
								:title="$t('contact.social.description.ar')"
								:placeholder="$t('contact.social.description.ar')"
							/>

							<inputs-textarea
								:rows="3"
								name="description.en"
								rules="required"
								:title="$t('contact.social.description.en')"
								:placeholder="$t('contact.social.description.en')"
							/>
						</div>
						<inputs-color :title="$t('contact.social.color')" name="color" />
						<div class="grid md:grid-cols-2 gap-6 p-2">
							<inputs-text
								:title="$t('contact.social.url')"
								:placeholder="$t('contact.social.url')"
								name="url"
								rules="required|url"
								icon="carbon:url"
							/>
							<inputs-text
								:title="$t('contact.social.icon')"
								:placeholder="$t('contact.social.icon')"
								name="icon"
								rules="required"
								icon="tabler:icons"
							/>
						</div>
					</GlobalFormDialog>
				</h3>
				<global-infinity-table
					class="max-h-96"
					finished
					v-if="contactInfos"
					:refresh="contactInfosRefresh"
					:data="contactInfos"
					:error="contactInfoError"
					:page="1"
					:status="contactInfoStatus"
					:to="(i) => i.url"
					:headers="[
						{ title: 'contact.social.icon', key: 'icon' },
						{ title: 'contact.social.url', key: 'url' },
						{ title: '', key: 'action' },
					]"
				>
					<template #icon="{ item }">
						<Icon :name="item" />
					</template>

					<template #action="{ row }">
						<div
							class="h-full flex items-center justify-end group-hover:!opacity-100 opacity-0"
							@click.prevent.stop
						>
							<GlobalConfirmDialog
								:title="$t('global.delete')"
								:content="$t('global.delete_question')"
								@confirm="() => deleteContactInfo(row._id)"
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
				</global-infinity-table>
			</div>
		</div>

		<details
			class="backdrop-blur-xl rounded-lg bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-2 shadow-xl"
		>
			<summary
				class="cursor-pointer hover:bg-gray-500/10 p-2 text-gray-700 dark:text-gray-300 text-lg font-bold flex items-center"
			>
				<span>
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
							class="rounded-full p-3 overflow-hidden after:absolute after:inset-6 hover:after:inset-0 after:transition-all relative after:backdrop-invert after:backdrop-hue-rotate-180 flex items-center hover:bg-slate-100/10"
						>
							<Icon name="mdi:plus" />
						</button>
					</template>
					<div class="grid md:grid-cols-2 gap-6 p-2">
						<inputs-text
							:title="$t('dashboard.site_settings.contact.faq.question.ar')"
							:placeholder="$t('dashboard.site_settings.contact.faq.question.ar')"
							name="question.ar"
							rules="required"
							icon="material-symbols:question-mark-rounded"
						/>
						<inputs-text
							:title="$t('dashboard.site_settings.contact.faq.question.en')"
							:placeholder="$t('dashboard.site_settings.contact.faq.question.en')"
							name="question.en"
							rules="required"
							icon="material-symbols:question-mark-rounded"
						/>

						<inputs-textarea
							:rows="5"
							name="answer.ar"
							rules="required"
							:title="$t('dashboard.site_settings.contact.faq.answer.ar')"
							:placeholder="$t('dashboard.site_settings.contact.faq.answer.ar')"
						/>

						<inputs-textarea
							:rows="5"
							name="answer.en"
							rules="required"
							:title="$t('dashboard.site_settings.contact.faq.answer.en')"
							:placeholder="$t('dashboard.site_settings.contact.faq.answer.en')"
						/>
					</div>
				</GlobalFormDialog>
			</summary>

			<global-infinity-table
				class="max-h-96"
				:finished="true"
				v-if="faqs"
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
			</global-infinity-table>
		</details>

		<details
			class="backdrop-blur-xl rounded-lg bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-2 shadow-xl"
		>
			<summary
				class="cursor-pointer hover:bg-gray-500/10 p-2 text-gray-700 dark:text-gray-300 text-lg font-bold flex items-center"
			>
				<span>
					{{ $t("contact.info.hours") }}
				</span>

				<GlobalFormDialog @submit="addWorkHours" max-width="950" :title="$t('contact.info.hours')">
					<template #btn="props">
						<button
							v-bind="props"
							type="button"
							class="rounded-full p-3 overflow-hidden after:absolute after:inset-6 hover:after:inset-0 after:transition-all relative after:backdrop-invert after:backdrop-hue-rotate-180 flex items-center hover:bg-slate-100/10"
						>
							<Icon name="mdi:plus" />
						</button>
					</template>

					<div class="grid md:grid-cols-2 gap-6 p-2">
						<inputs-text
							:title="$t('dashboard.site_settings.contact.hours.title.ar')"
							:placeholder="$t('dashboard.site_settings.contact.hours.title.ar')"
							name="day.ar"
							rules="required"
							icon="tabler:clock-hour-4"
						/>
						<inputs-text
							:title="$t('dashboard.site_settings.contact.hours.title.en')"
							:placeholder="$t('dashboard.site_settings.contact.hours.title.en')"
							name="day.en"
							rules="required"
							icon="tabler:clock-hour-4"
						/>

						<inputs-text
							:title="$t('dashboard.site_settings.contact.hours.answer.ar')"
							:placeholder="$t('dashboard.site_settings.contact.hours.answer.ar')"
							name="time.ar"
							rules="required"
							icon="tabler:clock-hour-4"
						/>
						<inputs-text
							:title="$t('dashboard.site_settings.contact.hours.answer.en')"
							:placeholder="$t('dashboard.site_settings.contact.hours.answer.en')"
							name="time.en"
							rules="required"
							icon="tabler:clock-hour-8"
						/>
					</div>
				</GlobalFormDialog>
			</summary>

			<global-infinity-table
				v-if="workHours"
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
			</global-infinity-table>
		</details>

		<details
			class="backdrop-blur-xl rounded-lg bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20 p-2 shadow-xl"
		>
			<summary
				class="cursor-pointer hover:bg-gray-500/10 p-2 text-gray-700 dark:text-gray-300 text-lg font-bold flex items-center"
			>
				<span>
					{{ $t("dashboard.site_settings.contact.message.title") }}
				</span>
			</summary>

			<global-infinity-table
				class="max-h-96 overflow-auto"
				v-if="messages"
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
						class="group cursor-pointer border-0 my-2 shadow !border-s-8 has-[:checked]:!bg-neutral-200 grid gap-4 md:grid-cols-4 p-2 px-4 hover:bg-gray-300/40 dark:hover:bg-gray-100/10"
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
								>
									{{ item.email }}
								</a>
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
						<div
							class="md:col-span-4 hidden has-[:checked]:block has-[:checked]:!bg-neutral-50 p-4 rounded shadow"
						>
							<pre>{{ item.message }}</pre>
							<input class="hidden" type="checkbox" />
						</div>
					</label>
				</template>
			</global-infinity-table>
		</details>
	</div>
</template>

<script setup lang="ts">
import { Icon } from "#components";
import { Form } from "vee-validate";

const commercial_registrationRef = ref<any>();
const { t, locale } = useI18n();

// Update Main Phone
const updateMainPhone = async (values: any) => {
	try {
		await useApi().patch("/globalData", values);
		useToast().success(t("dashboard.site_settings.success_update"));
	} catch (error) {
		useToast().error(t("dashboard.site_settings.error"));
	}
};

// Global Data
const { data: globalData, status: globalDataStatus } = useGlobalData();

// Contact Info
const {
	data: contactInfos,
	status: contactInfoStatus,
	error: contactInfoError,
	refresh: contactInfosRefresh,
} = useAsyncData(
	"contactInfo",
	() =>
		useApi()
			.get("/contactInfo")
			.then((d) => d.data),
	{ watch: [locale] },
);

const deleteContactInfo = async (id: number) => {
	await useApi().delete(`contactInfo?id=${id}`);
	useToast().success(t("dashboard.site_settings.success_delete"));
	await contactInfosRefresh();
};

const addContactInfo = async (data: any) => {
	await useApi().post("contactInfo", data);
	await contactInfosRefresh();
	useToast().success(t("dashboard.site_settings.success_update"));
};

const { data: pageContent, status: PageContentStatus } = usePageContent(PagesEnum.CONTACT);
// faqs
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
const imgRef = ref<any>();
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
} = useAsyncData("message", () =>
	useApi()
		.get("message")
		.then((d) => d.data),
);

const updatePageContent = async (values: any) => {
	try {
		await useApi().put("/page-content/contact", values);
		useToast().success(t("dashboard.site_settings.success_update"));
	} catch (error) {
		useToast().error(t("dashboard.site_settings.error"));
	}
};

const deleteMessages = async (id: number) => {
	await useApi().delete(`message?id=${id}`);
	useToast().success(t("dashboard.site_settings.success_delete"));

	await refreshMessages();
};
</script>
