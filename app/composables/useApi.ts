export const useApi = () => {
	const nuxtApp = useNuxtApp();

	if (!nuxtApp.$axios)
		throw new Error("[useApi] axios instance is not available. Make sure the plugin is loaded.");

	return nuxtApp.$axios;
};
