import { getQuery } from "#imports";
import { MessageService } from "../services/messages";

const messageService = new MessageService();

export default defineEventHandler(async (event) => {
	const lang = (getCookie(event, "i18n_redirected") as "ar" | "en") || "ar";
	try {
		switch (event.method) {
			case "GET":
				return messageService.list(lang);

			case "POST":
				const payload = await readBody(event);
				return await messageService.create(payload);

			case "DELETE":
				const { id } = getQuery(event);

				if (!id) throw createError({ status: 400, message: "id query is required." });
				return await messageService.delete(id as string);

			default:
				throw createError({
					message: "method is not allowed.",
					status: 405,
				});
		}
	} catch (err: any) {
		return err;
	}
});
