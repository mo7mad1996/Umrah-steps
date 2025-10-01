import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();

	const baseURL = config.public.baseUrl || '/api';

	const api = axios.create({
		baseURL,
		timeout: 10000,
		headers: {
			'Content-Type': 'application/json',
		}
	});

	api.interceptors.request.use((config) => {
		const token = useCookie("token").value;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	});

	api.interceptors.response.use(
		(response) => response,
		(error) => {
			console.error('[Axios Error]', error.message);
			return Promise.reject(error);
		}
	);

	return { provide: { axios: api } };
});
