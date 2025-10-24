export const useGlobalData = () => {
	const { data, status, error, refresh } = useAsyncData("globalData", () =>
		useApi()
			.get("/globalData")
			.then((d) => d.data),
	);

	return { data, status, error, refresh };
};
