import { updateGlobalOptions } from "vue3-toastify";

export const useToast = function () {
	const { $toast } = useNuxtApp();
	const dark = useCookie("dark");
	const locale = useCookie("i18n_redirected");

	console.log(locale.value);

	updateGlobalOptions({
		position: $toast.POSITION.BOTTOM_CENTER,

		transition: "bounce",
		closeButton: false,
		progressClassName: "!p-3 ",
		bodyClassName: "!text-black dark:!text-white font-bold",
		hideProgressBar: true,
		toastClassName: "dark:!bg-black/90 !bg-white/90 rounded-lg shadow-lg",
		containerClassName: "!p-1 ",

		theme: dark.value ? $toast.THEME.DARK : $toast.THEME.LIGHT,
		rtl: locale.value === "ar",
		autoClose: 1600,
	});

	return $toast;
};
