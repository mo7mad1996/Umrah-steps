export const useToast = function () {
	const { $toast } = useNuxtApp();

	return $toast;
};
