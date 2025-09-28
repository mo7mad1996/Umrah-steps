<template>
	<div>
		<LazyLayoutDashboardContent>
			<template #header>
				<LazyLayoutDashboardPageTitle
					:title="$t('global.settings')"
					:subTitle="$t('dashboard.profile.title')"
				/>
			</template>

			<template v-slot="">
				<div class="space-y-12">
					<!-- Account Settings Section -->
					<section>
						<h3
							class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
						>
							<Icon name="mdi:cog" />
							{{ $t("dashboard.profile.account_settings") }}
						</h3>

						<div class="space-y-4">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										{{ $t("dashboard.profile.language") }}
									</label>
									<InputsSelect v-model="lang" :items="langs" />
								</div>
							</div>
						</div>
					</section>

					<hr />

					<!-- Personal Information Section -->
					<section class="">
						<h3
							class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
						>
							<Icon name="mdi:account" />
							{{ $t("dashboard.profile.personal_info") }}
						</h3>

						<Form @submit="updateProfile" class="gap-4 grid md:grid-cols-2">
							<InputsText
								class="md:col-span-2"
								v-model="profileForm.name"
								name="name"
								:placeholder="$t('dashboard.profile.name')"
								icon="mdi:account"
							/>
							<InputsEmail
								v-model="profileForm.email"
								name="email"
								rules="required|email"
								:placeholder="$t('dashboard.profile.email')"
							/>
							<InputsPhone
								v-model="profileForm.phone"
								rules=""
								name="phone"
								:placeholder="$t('dashboard.profile.phone')"
							/>

							<div>
								<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									{{ $t("dashboard.profile.account_created") }}
								</label>
								<div
									class="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md text-sm text-gray-600 dark:text-gray-400"
								>
									<NuxtTime
										:datetime="user.createdAt"
										day="numeric"
										month="long"
										year="numeric"
										:locale="locale"
									/>
								</div>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									{{ $t("dashboard.profile.last_login") }}
								</label>
								<div
									class="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md text-sm text-gray-600 dark:text-gray-400"
								>
									<NuxtTime
										:datetime="user.lastLogin"
										day="numeric"
										month="long"
										year="numeric"
										relative
										:locale="locale"
									/>
								</div>
							</div>

							<InputsSubmit
								class="md:col-span-2"
								:text="$t('dashboard.profile.update_profile')"
								:isLoading="profileLoading"
							/>
						</Form>
					</section>

					<hr />

					<!-- Security Section -->
					<section>
						<h3
							class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
						>
							<Icon name="mdi:shield-lock" class="text-primary" />
							{{ $t("dashboard.profile.security") }}
						</h3>

						<Form @submit="changePassword" class="space-y-4">
							<InputsPassword
								v-model="passwordForm.currentPassword"
								name="currentPassword"
								rules="required"
								:placeholder="$t('dashboard.profile.current_password')"
							/>

							<InputsPassword
								v-model="passwordForm.newPassword"
								name="newPassword"
								rules="required|min:6"
								:placeholder="$t('dashboard.profile.new_password')"
							/>
							<InputsPassword
								v-model="passwordForm.confirmPassword"
								name="confirmPassword"
								rules="confirmed:@newPassword"
								:placeholder="$t('dashboard.profile.confirm_password')"
							/>

							<InputsSubmit
								:text="$t('dashboard.profile.change_password')"
								:isLoading="passwordLoading"
							/>
						</Form>
					</section>
				</div>
			</template>
		</LazyLayoutDashboardContent>
	</div>
</template>

<script setup lang="ts">
import { usePageTitle } from "#imports";
import { Form } from "vee-validate";

const { locale, setLocale, locales } = useI18n();

const langs = computed(() => {
	const i = locales.value || [];
	return i.map((i) => ({ title: i.name, value: i.code }));
});

const lang = computed({
	get() {
		return locale.value;
	},
	set(v: "ar" | "en") {
		setLocale(v);
	},
});

const user = useCookie("user", {
	decode: (u) => JSON.parse(atob(u)),
	encode: (u) => btoa(JSON.stringify(u)),
	default: () => ({}),
});

// Form data
const profileForm = reactive({
	name: user.value?.name || "",
	email: user.value?.email || "",
	phone: user.value?.phone || "",
});

const passwordForm = reactive({
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
});

// Loading states
const profileLoading = ref(false);
const passwordLoading = ref(false);

// Methods
const updateProfile = async (data: any) => {
	try {
		profileLoading.value = true;

		await useApi().patch("/me", data);

		// Update user cookie
		user.value = { ...user.value, ...data };

		useToast().success($t("dashboard.profile.success_update"));
	} catch (error: any) {
		useToast().error(error.message || "حدث خطأ أثناء التحديث");
	} finally {
		profileLoading.value = false;
	}
};

const changePassword = async (data: any) => {
	try {
		passwordLoading.value = true;

		// Validate password confirmation
		if (data.newPassword !== data.confirmPassword)
			throw new Error($t("dashboard.profile.error_password_match"));

		// Mock API call - replace with actual API
		await useApi().post("/me", data);

		// Reset form
		Object.assign(passwordForm, {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});

		useToast().success($t("dashboard.profile.success_password"));
	} catch (error: any) {
		useToast().error(
			error.response.data.message || error.message || "حدث خطأ أثناء تغيير كلمة المرور",
		);
	} finally {
		passwordLoading.value = false;
	}
};

// Metadata
usePageTitle("dashboard.profile_settings");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
