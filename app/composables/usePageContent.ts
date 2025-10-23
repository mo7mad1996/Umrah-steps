export enum PagesEnum {
	HOME = "home",
	HOTELS = "hotels",
	ABOUT = "about",
	CONTACT = "contact",
	FAVORITES = "favorites",
	PRIVACY_POLICY = "privacy_policy",
	USER_AGREEMENT = "user_agreement",
	TERMS_CONDITIONS = "terms_conditions",
}

export const usePageContent = (page: PagesEnum) => {
	const { data, status, error, refresh } = useAsyncData("pageContent-" + page, () =>
		useApi()
			.get("/page-content/" + page)
			.then((r) => r.data),
	);

	return { data, status, error, refresh };
};
