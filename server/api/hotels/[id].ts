import { Query } from "~/types/Query";
import { HotelService } from "../../services/hotel";
import { IHotelRequest } from "~/types/hotel";

const hotelService = new HotelService();

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery<Query>(event);
		const lang = (getCookie(event, "i18n_redirected") as "ar" | "en") || "ar";
		const id = getRouterParam(event, "id") as string;

		switch (event.method) {
			case "GET":
				return await hotelService.get(id, query, lang);

			case "PATCH":
				const update: IHotelRequest = await readBody(event);
				return await hotelService.update(id, update);

			case "DELETE":
				return await hotelService.delete(id);

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
