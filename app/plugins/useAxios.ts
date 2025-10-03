import axios from "axios";

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();
	const baseURL = config.public.baseUrl || "/api";

	const api = axios.create({
		baseURL,
		timeout: 10000,
		headers: {
			"Content-Type": "application/json",
		},
	});

	return { provide: { axios: api } };
});
