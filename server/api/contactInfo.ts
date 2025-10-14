import { getContactInfos, createContactInfo, deleteContactInfo } from "../services/contactInfo";

export default defineEventHandler(async (event) => {
	switch (event.method) {
		case "GET":
			return await getContactInfos();

		case "POST":
			const body = await readBody(event);
			return await createContactInfo(body);

		case "DELETE":
			const query = getQuery(event);
			const id = query.id as string;
			if (!id) throw createError({ status: 400, message: "id query is required." });
			return await deleteContactInfo(id);

		default:
			throw createError({
				message: "method is not allowed.",
				status: 405,
			});
	}
});
