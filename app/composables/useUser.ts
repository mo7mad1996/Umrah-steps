import type { User_DB_Schema } from "~/types/user";

export const useUser = () => {
	const { $i18n, $toast } = useNuxtApp();

	const toast = $toast;

	const { data, error, status, refresh } = useAsyncData(
		`me`,
		() =>
			useApi()
				.get("/me")
				.then((r) => r.data as User_DB_Schema),
		{
			server: false,
		},
	);

	watch(error, (val) => {
		if (val && import.meta.client && toast) {
			console.error(val);
			const token = useCookie("token");
			token.value = undefined;
			navigateTo("/login");
			toast.error($i18n.t("dashboard.forceLogout"));
		}
	});

	return { data, error, status, refresh };
};
