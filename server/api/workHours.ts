import { getQuery } from "#imports";
import { WorkHoursService } from "../services/workHours";

const workHoursService = new WorkHoursService();

export default defineEventHandler(async (event) => {
	const lang = (getCookie(event, "i18n_redirected") as "ar" | "en") || "ar";
	try {
		switch (event.method) {
			case "GET":
				return workHoursService.list(lang);

			case "POST":
				const payload = await readBody(event);
				return await workHoursService.create(payload);

			case "PATCH":
				const body = await readBody(event);
				return await workHoursService.update(body.id, body);

			case "DELETE":
				const { id } = getQuery(event);
				if (!id) throw createError({ status: 400, message: "id query is required." });
				return await workHoursService.delete(id as string);

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
