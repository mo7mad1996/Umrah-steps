<template>
	<LayoutDashboardContent>
		<template #header>
			<LazyLayoutDashboardPageTitle :title="$t('dashboard.profile.title')" />
		</template>

		<template>
			<div class="space-y-6">
				<!-- Personal Information Section -->
				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
					<h3
						class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
					>
						<Icon name="mdi:account" class="text-primary" />
						{{ $t("dashboard.profile.personal_info") }}
					</h3>

					<Form @submit="updateProfile" class="space-y-4">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<InputsText
								v-model="profileForm.name"
								name="name"
								rules="required"
								:placeholder="$t('dashboard.profile.name')"
								icon="mdi:account"
							/>
							<InputsEmail
								v-model="profileForm.email"
								name="email"
								rules="required|email"
								:placeholder="$t('dashboard.profile.email')"
								:disabled="true"
							/>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<InputsPhone
								v-model="profileForm.phone"
								name="phone"
								:placeholder="$t('dashboard.profile.phone')"
							/>
							<InputsText
								v-model="profileForm.role"
								name="role"
								:placeholder="$t('dashboard.profile.role')"
								icon="mdi:shield-account"
								:disabled="true"
							/>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
									الآن
								</div>
							</div>
						</div>

						<div class="flex justify-end">
							<InputsSubmit
								:text="$t('dashboard.profile.update_profile')"
								:isLoading="profileLoading"
							/>
						</div>
					</Form>
				</div>

				<!-- Account Settings Section -->
				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
					<h3
						class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
					>
						<Icon name="mdi:cog" class="text-primary" />
						{{ $t("dashboard.profile.account_settings") }}
					</h3>

					<div class="space-y-4">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									{{ $t("dashboard.profile.language") }}
								</label>
								<InputsSelect
									v-model="settingsForm.language"
									:items="[
										{ value: 'ar', title: 'العربية' },
										{ value: 'en', title: 'English' },
									]"
									@update="changeLanguage"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									{{ $t("dashboard.profile.theme") }}
								</label>
								<InputsSelect
									v-model="settingsForm.theme"
									:items="[
										{ value: false, title: 'فاتح / Light' },
										{ value: true, title: 'داكن / Dark' },
									]"
									@update="changeTheme"
								/>
							</div>
						</div>

						<div class="space-y-3">
							<h4 class="text-md font-medium text-gray-900 dark:text-white">
								{{ $t("dashboard.profile.notifications") }}
							</h4>
							<div class="space-y-2">
								<InputsCheckbox
									v-model="settingsForm.emailNotifications"
									name="emailNotifications"
									:title="$t('dashboard.profile.email_notifications')"
								/>
								<InputsCheckbox
									v-model="settingsForm.smsNotifications"
									name="smsNotifications"
									:title="$t('dashboard.profile.sms_notifications')"
								/>
							</div>
						</div>
					</div>
				</div>

				<!-- Security Section -->
				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
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

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<InputsPassword
								v-model="passwordForm.newPassword"
								name="newPassword"
								rules="required|min:6"
								:placeholder="$t('dashboard.profile.new_password')"
							/>
							<InputsPassword
								v-model="passwordForm.confirmPassword"
								name="confirmPassword"
								rules="required|min:6"
								:placeholder="$t('dashboard.profile.confirm_password')"
							/>
						</div>

						<div class="flex justify-end">
							<InputsSubmit
								:text="$t('dashboard.profile.change_password')"
								:isLoading="passwordLoading"
							/>
						</div>
					</Form>
				</div>
			</div>
		</template>
	</LayoutDashboardContent>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";

const { locale, setLocale } = useI18n();
const user = useCookie("user", {
	decode: (u) => JSON.parse(atob(u)),
	default: () => ({}),
});
const dark = useCookie("dark", { default: () => false });

// Form data
const profileForm = reactive({
	name: user.value?.name || "",
	email: user.value?.email || "",
	phone: user.value?.phone || "",
	role: user.value?.role || "user",
});

const passwordForm = reactive({
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
});

const settingsForm = reactive({
	language: locale.value,
	theme: dark.value,
	emailNotifications: true,
	smsNotifications: false,
});

// Loading states
const profileLoading = ref(false);
const passwordLoading = ref(false);

// Methods
const updateProfile = async (data: any) => {
	try {
		profileLoading.value = true;

		// Mock API call - replace with actual API
		await new Promise((resolve) => setTimeout(resolve, 1000));

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
		if (data.newPassword !== data.confirmPassword) {
			throw new Error($t("dashboard.profile.error_password_match"));
		}

		// Mock API call - replace with actual API
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Reset form
		Object.assign(passwordForm, {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});

		useToast().success($t("dashboard.profile.success_password"));
	} catch (error: any) {
		useToast().error(error.message || "حدث خطأ أثناء تغيير كلمة المرور");
	} finally {
		passwordLoading.value = false;
	}
};

const changeLanguage = ({ value }: any) => {
	setLocale(value);
	settingsForm.language = value;
};

const changeTheme = ({ value }: any) => {
	dark.value = value;
	settingsForm.theme = value;
};

// Metadata
usePageTitle("dashboard.profile_settings");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
