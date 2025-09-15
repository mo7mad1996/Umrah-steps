<template>
  <div class="flex justify-center py-sm">
    <div
      class="shadow bg-white rounded-xl overflow-hidden max-w-[730px] w-[80dvw]"
    >
      <div
        class="bg-zinc-50 border border-[#0000000D] rounded-t-xl flex gap-4 md:gap-8 items-start p-3 md:!px-10 md:py-6"
      >
        <nuxtLink to="/">
          <NuxtImg
            src="/logo/vertical.png"
            alt="Almotamer logo"
            class="aspect-square object-contain w-20 block"
          />
        </nuxtLink>
        <div class="flex flex-col">
          <h3 class="font-bold text-2xl md:text-3xl">
            {{ $t("auth.login") }}
          </h3>
          <p class="text-xs md:!text-sm text-neutral-900 opacity-70">
            {{ $t("auth.description") }}
          </p>
        </div>
      </div>

      <div class="p-4 md:!p-8">
        <Form @submit="onSubmit">
          <InputsEmail
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
  </div>
</template>

<script setup lang="ts">
import type { User_credentials } from "~/types/user"
import { Form } from "vee-validate"
const u = useCookie("user", {
  maxAge: 60 * 60 * 24 * 7,
  encode: (val) => btoa(JSON.stringify(val)),
  decode: (val) => {
    console.log(val)
    return JSON.parse(atob(val))
  },
})
const t = useCookie("token", { maxAge: 60 * 60 * 24 * 7 })

// data
const isLoading = ref(false)
const credentials = ref<User_credentials>({
  email: "",
  password: "",
})

const onSubmit: any = async (payload: User_credentials) => {
  try {
    isLoading.value = true
    const res = await useApi().post("/login", payload)

    const { user, token } = res.data
    u.value = user
    t.value = token

    await navigateTo("/dashboard")
  } catch (err: any) {
    useToast().error(
      err?.response?.data?.message || err.message || "An error occurred"
    )
  } finally {
    isLoading.value = false
  }
}

usePageTitle("auth.title")
definePageMeta({
  layout: "empty",
  middleware: "guest",
})
</script>
