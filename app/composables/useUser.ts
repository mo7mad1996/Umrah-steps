import type { User_DB_Schema } from "~/types/user";

export const useUser = () => {
	const { t } = useI18n();

	const { data, error, status, refresh } = useAsyncData(`me`, () =>
		useApi()
			.get("/me")
			.then((r) => r.data as User_DB_Schema),
	);

	watch(error, (val) => {
		if (val) {
			console.error(val);
			navigateTo("/login");
			useToast().error(t("dashboard.forceLogout"));
		}
	});

	return { data, error, status, refresh };
};
