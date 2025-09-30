import { toast } from "vue3-toastify";

export default defineNuxtPlugin((nuxtApp) => {
	return {
		provide: { toast },
	};
});
