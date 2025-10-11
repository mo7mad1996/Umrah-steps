export const useCity = () => {
	const cities = ref<any[]>([]);
	const page = ref(1);

	const { data, status, refresh, error } = useAsyncData(
		"cities",
		() =>
			useApi()
				.get("/cities", {
					params: {
						page: page.value,
						per_page: 20,
					},
				})
				.then((d) => d.data),
		{ watch: [page] },
	);

	const getCityById = async (id: string) => {
		try {
			const response = await useApi().get(`/cities/${id}`);
			return response.data;
		} catch (err: any) {
			error.value = err.message;
			console.error("Error fetching city:", err);
		}
	};

	const updateCity = async (id: string, data: any) => {
		try {
			const response = await useApi().put(`/cities/${id}`, data);
			const index = cities.value.findIndex((c) => c._id === id);
			if (index !== -1) cities.value[index] = response.data;

			return response.data;
		} catch (err: any) {
			error.value = err.message;
			throw err;
		}
	};

	const deleteCity = async (id: string) => {
		try {
			const response = await useApi().delete(`/cities/${id}`);
			cities.value = cities.value.filter((c) => c._id !== id);
			return true;
		} catch (err: any) {
			error.value = err.message;
			throw err;
		}
	};

	return {
		cities: data,
		status,
		page,
		refresh,
		error,
		getCityById,
		updateCity,
		deleteCity,
	};
};
