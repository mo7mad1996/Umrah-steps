export const useApi = () => {
	const nuxtApp = useNuxtApp();
	const baseURL = nuxtApp.$config.public.baseUrl || "/api";

	if (import.meta.server) {
		// SSR mode: simulate Axios-like response
		const wrapFetch = async (url: string, options?: any) => {
			const data = await $fetch(url, { baseURL, ...options });
			return { data }; // unify with axios format
		};

		return {
			get: (url: string, options?: any) => wrapFetch(url, { method: "GET", ...options }),
			post: (url: string, body?: any, options?: any) =>
				wrapFetch(url, { method: "POST", body, ...options }),
			put: (url: string, body?: any, options?: any) =>
				wrapFetch(url, { method: "PUT", body, ...options }),
			delete: (url: string, options?: any) => wrapFetch(url, { method: "DELETE", ...options }),
		};
	}

	if (!nuxtApp.$axios)
		throw new Error("[useApi] axios instance is not available. Make sure the plugin is loaded.");

	return nuxtApp.$axios;
};
