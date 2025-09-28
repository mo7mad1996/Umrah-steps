import axios from "axios";

export default defineNuxtPlugin(() => {
	// env
	const config = useRuntimeConfig();

	const api = axios.create({ baseURL: config.public.baseUrl });

	api.interceptors.request.use((config) => {
		const token = useCookie("token").value;

		if (token) config.headers.Authorization = `Bearer ${token}`;

		return config;
	});

	return { provide: { axios: api } };
});
