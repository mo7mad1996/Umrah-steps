import { toast, updateGlobalOptions } from "vue3-toastify";

export default defineNuxtPlugin(() => {
	updateGlobalOptions({
		position: toast.POSITION.BOTTOM_CENTER,
		transition: "bounce",
		closeButton: false,
		progressClassName: "!p-3",
		bodyClassName: "!text-black dark:!text-white font-bold",
		hideProgressBar: true,
		toastClassName: "dark:!bg-black/50 !bg-white/40 rounded-lg shadow-lg backdrop-blur-md",
		containerClassName: "!p-1",
		autoClose: 2600,
		clearOnUrlChange: false,
	});

	return { provide: { toast } };
});
