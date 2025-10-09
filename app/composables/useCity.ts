export const useCity = () => {
  const { locale } = useI18n();

  const cities = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCities = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await useApi().get('/cities');
      if (response.success) {
        cities.value = response.data;
      }
    } catch (err: any) {
      error.value = err.message;
      console.error('Error fetching cities:', err);
    } finally {
      loading.value = false;
    }
  };

  const getCityById = async (id: string) => {
    try {
      const response = await useApi().get(`/cities/${id}`);
      if (response.success) {
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message;
      console.error('Error fetching city:', err);
    }
  };

  const createCity = async (data: any) => {
    try {
      const response = await useApi().post('/cities', data);
      if (response.success) {
        cities.value.push(response.data);
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message;
      throw err;
    }
  };

  const updateCity = async (id: string, data: any) => {
    try {
      const response = await useApi().put(`/cities/${id}`, data);
      if (response.success) {
        const index = cities.value.findIndex((c) => c._id === id);
        if (index !== -1) {
          cities.value[index] = response.data;
        }
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteCity = async (id: string) => {
    try {
      const response = await useApi().delete(`/cities/${id}`);
      if (response.success) {
        cities.value = cities.value.filter((c) => c._id !== id);
        return true;
      }
    } catch (err: any) {
      error.value = err.message;
      throw err;
    }
  };

  const getCityName = (city: any) => {
    if (!city) return '';
    return locale.value === 'ar' ? city.name.ar : city.name.en;
  };

  const getCitiesForSelect = computed(() => {
    return cities.value.map((city) => ({
      title: getCityName(city),
      value: city._id,
    }));
  });

  return {
    cities,
    loading,
    error,
    fetchCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity,
    getCityName,
    getCitiesForSelect,
  };
};
