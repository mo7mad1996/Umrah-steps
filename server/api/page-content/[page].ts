import { getPageContent, updatePageContent } from "../../services/pageContent";

export default defineEventHandler(async (event) => {
	const page = getRouterParam(event, "page");

	if (!page) throw createError({ status: 400, message: "Page parameter is required." });

	switch (event.method) {
		case "GET":
			return await getPageContent(page);

		case "PUT":
		case "PATCH":
			const body = await readBody(event);
			return await updatePageContent(page, body);

		default:
			throw createError({
				message: "method is not allowed.",
				status: 405,
			});
	}
});
