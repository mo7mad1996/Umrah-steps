<template>
  <div
    class="w-full relative bg-neutral-100 dark:!bg-indigo-950 rounded-2xl px-4 md:px-6 py-4 shadow"
  >
    <Form>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <!-- section 1 -->
        <div>
          <h3 class="text-sm md:text-base mb-2">{{ $t("dashboard.destination") }}</h3>

          <InputsSelect
            :items="[
              { value: 1, title: 'مكة المكرمة' },
              { value: 2, title: 'المدينة المنورة' },
              { value: 3, title: 'الرياض' },
              { value: 4, title: 'جدة' },
              { value: 5, title: 'الطائف' },
            ]"
            customClass="shadow-lg !bg-neutral-100 my-2 md:my-4"
            :placeholder="$t('dashboard.destination')"
          >
            <template #icon>
              <Icon name="bi:flag-fill" class="dark:text-white"></Icon>
            </template>
          </InputsSelect>
        </div>

        <!-- section 2 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
          <div>
            <h3 class="text-sm md:text-base mb-2">{{ $t("dashboard.arrival_date") }}</h3>

            <InputsDate
              customClass="shadow-lg !bg-neutral-100 my-2 md:my-4"
              name="dashboard.arrival_date"
              format="yyyy-MM-dd"
            />
          </div>
          <div>
            <h3 class="text-sm md:text-base mb-2">{{ $t("dashboard.return_date") }}</h3>

            <InputsDate
              customClass="shadow-lg !bg-neutral-100 my-2 md:my-4"
              name="dashboard.return_date"
              format="yyyy-MM-dd"
            />
          </div>
        </div>

        <!-- section 3 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
          <div>
            <h3 class="text-sm md:text-base mb-2">{{ $t("dashboard.number_of_rooms") }}</h3>

            <InputsText
              inputmode="numeric"
              type="number"
              name="number_of_rooms"
              :placeholder="$t('dashboard.number_of_rooms')"
              customClass="shadow-lg !bg-neutral-100 my-2 md:my-4"
              icon="mdi-bed"
            />
          </div>
          <div>
            <h3 class="text-sm md:text-base mb-2">{{ $t("dashboard.number_of_people") }}</h3>

            <InputsText
              inputmode="numeric"
              type="number"
              name="number_of_people"
              :placeholder="$t('dashboard.number_of_people')"
              customClass="shadow-lg !bg-neutral-100 my-2 md:my-4"
              icon="mdi-account"
            />
          </div>
        </div>

        <div class="pt-2 md:pt-4 col-span-1 md:col-span-2 lg:col-span-1">
          <InputsSubmit :text="$t('search')" />
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
</script>
