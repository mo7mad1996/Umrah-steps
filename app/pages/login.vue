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
        <Form @submit="onSubmit" v-slot="{ validate, values }">
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
import { required } from "@vee-validate/rules"

// data
const isLoading = ref(false)
const credentials = ref<User_credentials>({
  email: "",
  password: "",
})

const onSubmit = () => {}

definePageMeta({
  layout: "empty",
})
</script>
