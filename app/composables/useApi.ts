export const useApi = () => {
	const nuxtApp = useNuxtApp();

	const { path } = nuxtApp.$router.currentRoute.value;

	if (!nuxtApp.$axios)
		throw new Error("[useApi] axios instance is not available. Make sure the plugin is loaded.");

	nuxtApp.$axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response?.status === 401 && path !== "/login") {
				nuxtApp.$router.push("/login");
			}

			nuxtApp.$toast.error(error?.response?.data?.message || error?.message || "An error occurred");
			return Promise.reject(error);
		},
	);

	return nuxtApp.$axios;
};
