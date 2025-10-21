<template>
	<div class="shadow bg-white dark:!bg-gray-800 rounded-xl overflow-hidden max-w-[730px] w-[80dvw]">
		<div
			class="bg-zinc-50 border dark:!bg-gray-700 border-black/40 rounded-t-xl flex gap-4 md:gap-8 items-start p-3 md:!px-10 md:py-6"
		>
			<nuxtLink to="/">
				<NuxtImg
					src="/logo/vertical.png"
					alt="motamer logo"
					class="aspect-square object-contain w-12 md:w-20 block"
				/>
			</nuxtLink>
			<div class="flex flex-col dark:text-white">
				<h3 class="font-bold text-xl my-1 md:text-3xl">
					{{ $t("auth.login") }}
				</h3>
				<p class="text-xs md:!text-sm opacity-70">
					{{ $t("auth.description") }}
				</p>
			</div>
		</div>

		<div class="p-4 md:!p-8">
			<Form @submit="onSubmit">
				<InputsEmail
					autofocus
					v-model="credentials.email"
					rules="required|email"
					:placeholder="$t('auth.email')"
				/>
				<InputsPassword
					v-model="credentials.password"
					rules="required"
					:placeholder="$t('auth.password')"
				/>
				<!-- Submit Button -->
				<InputsSubmit :text="$t('auth.login')" :isLoading="isLoading" />
			</Form>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { User_credentials } from "~/types/user";
import { Form } from "vee-validate";

// data
const isLoading = ref(false);
const credentials = ref<User_credentials>({
	email: "",
	password: "",
});

const onSubmit: any = async (payload: User_credentials) => {
	try {
		isLoading.value = true;
		const res = await useApi().post("/login", payload);
		await navigateTo("/dashboard");
	} finally {
		isLoading.value = false;
	}
};

usePageTitle("auth.title");
definePageMeta({
	layout: "empty",
	middleware: "guest",
});
</script>
