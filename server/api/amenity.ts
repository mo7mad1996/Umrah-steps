import { IAmenity } from "~/types/hotel";
import { AmenityService } from "../services/amenity";
import { Query } from "~/types/Query";

const amenityService = new AmenityService();

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery<Query>(event);

		switch (event.method) {
			case "GET":
				return await amenityService.list(query);

			case "POST":
				const body: IAmenity = await readBody(event);
				return await amenityService.create(body);

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
