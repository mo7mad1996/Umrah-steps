import { updateGlobalOptions } from "vue3-toastify";

export const useToast = function () {
	const { $toast } = useNuxtApp();

	// const { locale } = useI18n();

	updateGlobalOptions({
		position: $toast.POSITION.BOTTOM_CENTER,

		transition: "bounce",
		closeButton: false,
		progressClassName: "!p-3 ",
		bodyClassName: "!text-black dark:!text-white font-bold",
		hideProgressBar: true,
		toastClassName: "dark:!bg-black/90 !bg-white/90 rounded-lg shadow-lg",
		containerClassName: "!p-1",
		autoClose: 2600,

		// theme: theme.name.value as "dark" | "light",
		// rtl: locale.value === "ar",
	});

	return $toast;
};
