import type { User_DB_Schema } from "~/types/user";

export const useUser = () => {
	const { t } = useI18n();
	const toast = process.client ? useToast() : null;

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
		if (val && process.client && toast) {
			console.error(val);
			const token = useCookie("token");
			token.value = undefined;
			navigateTo("/login");
			toast.error(t("dashboard.forceLogout"));
		}
	});

	return { data, error, status, refresh };
};
