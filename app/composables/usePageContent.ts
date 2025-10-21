export enum PagesEnum {
	HOME = "home",
	HOTELS = "hotels",
	ABOUT = "about",
	CONTACT = "contact",
	FAVORITES = "favorites",
}

export const usePageContent = (page: PagesEnum) => {
	const { data, status, error, refresh } = useAsyncData("pageContent-" + page, () =>
		useApi()
			.get("/page-content/" + page)
			.then((r) => r.data),
	);

	return { data, status, error, refresh };
};
