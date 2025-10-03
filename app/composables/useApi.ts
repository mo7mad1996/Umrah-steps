export const useApi = () => {
	const nuxtApp = useNuxtApp();

	if (!nuxtApp.$axios)
		throw new Error("[useApi] axios instance is not available. Make sure the plugin is loaded.");

	nuxtApp.$axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response?.status === 401) {
				// nuxtApp.$router.push("/login");
				navigateTo("/login");
			}

			return Promise.reject(error);
		},
	);

	return nuxtApp.$axios;
};
