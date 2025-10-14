import { createError, getQuery } from "#imports";
import { FaqService } from "../services/faq";

const faqService = new FaqService();

export default defineEventHandler(async (event) => {
	const lang = (getCookie(event, "i18n_redirected") as "ar" | "en") || "ar";
	try {
		switch (event.method) {
			case "GET":
				return faqService.list(lang);

			case "POST":
				const payload = await readBody(event);
				return await faqService.create(payload);

			case "PATCH":
				const body = await readBody(event);
				return await faqService.update(body.id, body);

			case "DELETE":
				const { id } = getQuery(event);
				if (!id) throw createError({ status: 400, message: "id query is required." });
				return await faqService.delete(id as string);

			default:
				throw createError({
					message: "method is not allowed.",
					status: 405,
				});
		}
	} catch (err: any) {
		throw createError(err);
	}
});
