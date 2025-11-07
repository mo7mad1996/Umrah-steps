import axios from "axios";
import { toast } from "vue3-toastify";

export default defineNuxtPlugin((nuxtApp) => {
	const route = useRoute();
	const router = useRouter();
	const config = useRuntimeConfig();
	const baseURL = config.public.baseUrl || "/api";

	const api = axios.create({
		baseURL,
		timeout: 10000,
		headers: {
			"Content-Type": "application/json",
		},
	});

	api.interceptors.response.use(
		(response: any) => response,
		(error: any) => {
			if (error.response?.status === 401 && route.path !== "/login") {
				router.push("/login");
			}

			if (import.meta.client)
				toast.error(error?.response?.data?.message || error?.message || "An error occurred");
			return Promise.reject(error);
		},
	);
	return { provide: { axios: api } };
});
