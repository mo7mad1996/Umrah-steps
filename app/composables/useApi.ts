export const useApi = () => {
	const nuxtApp = useNuxtApp();
	const token = useCookie("token");

	if (!nuxtApp.$axios)
		throw new Error("[useApi] axios instance is not available. Make sure the plugin is loaded.");

	nuxtApp.$axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response?.status === 401) {
				// nuxtApp.$router.push("/login");
				token.value = undefined;
				navigateTo("/login");
			}

			console.error(error);
			return error;
		},
	);

	return nuxtApp.$axios;
};
