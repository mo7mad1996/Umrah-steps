import { getCityById, updateCity, deleteCity } from "../../services/city";

export default defineEventHandler(async (event) => {
	const method = event.method;
	const id = getRouterParam(event, "id");
	if (!id) throw createError({ status: 400, message: "id query is required." });

	try {
		switch (event.method) {
			case "GET":
				return await getCityById(id);

			case "PUT":
			case "PATCH":
			case "POST":
				const body = await readBody(event);
				return await updateCity(id, body);

			case "DELETE":
				return await deleteCity(id);

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
