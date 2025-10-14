import { getCities, createCity } from "../../services/city";

export default defineEventHandler(async (event) => {
	try {
		switch (event.method) {
			case "GET":
				return await getCities();

			case "POST":
				const body = await readBody(event);
				return await createCity(body);

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
