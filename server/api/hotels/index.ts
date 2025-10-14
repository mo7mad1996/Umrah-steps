import { Query } from "~/types/Query";
import { IHotelRequest } from "~/types/hotel";
import { HotelService } from "~~/server/services/hotel";

const hotelService = new HotelService();
export default defineEventHandler(async (event) => {
	try {
		const query = getQuery<Query>(event);
		const lang = (getCookie(event, "i18n_redirected") as "ar" | "en") || "ar";

		switch (event.method) {
			case "GET":
				return await hotelService.list(query, lang);

			case "POST":
				const body: IHotelRequest = await readBody(event);
				return await hotelService.create(body);

			default:
				throw createError({
					message: "method is not allowed.",
					status: 405,
				});
		}
	} catch (err: any) {
		throw createError({ message: err.message, status: 400 });
	}
});
