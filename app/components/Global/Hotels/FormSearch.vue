<template>
  <div
    class="w-full relative bg-neutral-100 dark:!bg-indigo-950 rounded-2xl px-6 py-4 shadow"
  >
    <Form>
      <div class="grid grid-cols-4 gap-6">
        <!-- section 1 -->
        <div>
          <h3>{{ $t("dashboard.destination") }}</h3>

          <InputsSelect
            :items="[
              { value: 1, title: 'مكة المكرمة' },
              { value: 2, title: 'المدينة المنورة' },
              { value: 3, title: 'الرياض' },
              { value: 4, title: 'جدة' },
              { value: 5, title: 'الطائف' },
            ]"
            customClass="shadow-lg !bg-neutral-100  my-4"
            :placeholder="$t('dashboard.destination')"
          >
            <template #icon>
              <Icon name="bi:flag-fill" class="dark:text-white"></Icon>
            </template>
          </InputsSelect>
        </div>

        <!-- section 2 -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3>{{ $t("dashboard.arrival_date") }}</h3>

            <InputsDate
              customClass="shadow-lg !bg-neutral-100  my-4"
              name="dashboard.arrival_date"
              format="yyyy-MM-dd"
            />
          </div>
          <div>
            <h3>{{ $t("dashboard.return_date") }}</h3>

            <InputsDate
              customClass="shadow-lg !bg-neutral-100  my-4"
              name="dashboard.return_date"
              format="yyyy-MM-dd"
            />
          </div>
        </div>

        <!-- section 3 -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3>{{ $t("dashboard.number_of_rooms") }}</h3>

            <InputsText
              inputmode="numeric"
              type="number"
              name="number_of_rooms"
              :placeholder="$t('dashboard.number_of_rooms')"
              customClass="shadow-lg !bg-neutral-100  my-4"
              icon="mdi-bed"
            />
          </div>
          <div>
            <h3>{{ $t("dashboard.number_of_people") }}</h3>

            <InputsText
              inputmode="numeric"
              type="number"
              name="number_of_people"
              :placeholder="$t('dashboard.number_of_people')"
              customClass="shadow-lg !bg-neutral-100  my-4"
              icon="mdi-account"
            />
          </div>
        </div>

        <div class="pt-4">
          <InputsSubmit :text="$t('search')" />
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
</script>
