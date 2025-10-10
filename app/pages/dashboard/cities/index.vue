<template>
  <div>
    <LayoutDashboardPageTitle :title="$t('cities.title')" />

    <v-card class="mt-4 dark:bg-gray-800">
      <v-card-text>
        <div class="flex justify-between items-center mb-6">
          <div></div>
          <v-btn
            color="primary"
            prepend-icon="mdi:plus"
            @click="openDialog()"
          >
            {{ $t('cities.add_city') }}
          </v-btn>
        </div>

        <div v-if="loading" class="flex justify-center py-12">
          <GlobalLoading />
        </div>

        <div v-else-if="cities.length === 0" class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">{{ $t('cities.no_cities') }}</p>
        </div>

        <v-table v-else class="dark:bg-gray-800">
          <thead>
            <tr>
              <th class="text-start dark:text-white">#</th>
              <th class="text-start dark:text-white">{{ $t('cities.name_ar') }}</th>
              <th class="text-start dark:text-white">{{ $t('cities.name_en') }}</th>
              <th class="text-center dark:text-white">{{ $t('global.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(city, index) in cities" :key="city._id">
              <td class="dark:text-gray-300">{{ index + 1 }}</td>
              <td class="dark:text-gray-300">{{ city.name.ar }}</td>
              <td class="dark:text-gray-300">{{ city.name.en }}</td>
              <td class="text-center">
                <v-btn
                  size="small"
                  icon="mdi:pencil"
                  variant="text"
                  color="primary"
                  @click="openDialog(city)"
                  class="dark:text-blue-400"
                />
                <v-btn
                  size="small"
                  icon="mdi:delete"
                  variant="text"
                  color="error"
                  @click="openDeleteDialog(city)"
                  class="dark:text-red-400"
                />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <GlobalCityDialog
      v-model="dialogOpen"
      :city="selectedCity"
      @saved="handleSaved"
    />

    <GlobalConfirmDialog
      v-model="deleteDialogOpen"
      :title="$t('cities.confirm_delete')"
      :message="$t('cities.confirm_delete_message')"
      :confirm-text="$t('global.delete')"
      :cancel-text="$t('global.cancel')"
      @confirm="handleDelete"
      @cancel="deleteDialogOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const { t } = useI18n();
const { cities, loading, fetchCities, deleteCity } = useCity();
const { showToast } = useToast();

usePageTitle('cities.title');

const dialogOpen = ref(false);
const deleteDialogOpen = ref(false);
const selectedCity = ref<any>(null);
const cityToDelete = ref<any>(null);

const openDialog = (city: any = null) => {
  selectedCity.value = city;
  dialogOpen.value = true;
};

const openDeleteDialog = (city: any) => {
  cityToDelete.value = city;
  deleteDialogOpen.value = true;
};

const handleSaved = () => {
  fetchCities();
};

const handleDelete = async () => {
  try {
    await deleteCity(cityToDelete.value._id);
    showToast(t('cities.deleted'), 'success');
    deleteDialogOpen.value = false;
    cityToDelete.value = null;
  } catch (error: any) {
    showToast(error.message || t('cities.error'), 'error');
  }
};

onMounted(() => {
  fetchCities();
});
</script>
