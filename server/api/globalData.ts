import { GlobalDataService } from "../services/globalData";
const globalDataService = new GlobalDataService();

export default defineEventHandler(async (event) => {
	switch (event.method) {
		case "GET":
			return await globalDataService.read();

		case "PATCH":
			return await globalDataService.update(await readBody(event));

		default:
			throw createError({
				message: "method is not allowed.",
				status: 405,
			});
	}
});
