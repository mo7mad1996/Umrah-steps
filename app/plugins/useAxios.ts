import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	console.clear();

	const baseURL = config.public.baseUrl || "/api";

	const api = axios.create({
		baseURL,
		timeout: 10000,
		headers: {
			"Content-Type": "application/json",
		},
	});

	api.interceptors.request.use((config) => {
		if (import.meta.client) {
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("token="))
				?.split("=")[1];

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		return config;
	});

	api.interceptors.response.use(
		(response) => response,
		(error) => Promise.reject(error),
	);

	return { provide: { axios: api } };
});
