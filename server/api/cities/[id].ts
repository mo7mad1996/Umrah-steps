import { getCityById, updateCity, deleteCity } from "../../services/city";

export default defineEventHandler(async (event) => {
	const method = event.method;
	const id = getRouterParam(event, "id");

	if (!id) {
		return {
			success: false,
			message: "City ID is required",
		};
	}

	if (method === "GET") {
		try {
			const city = await getCityById(id);
			return city;
		} catch (error: any) {
			return {
				success: false,
				message: error.message,
			};
		}
	}

	if (method === "PUT" || method === "PATCH") {
		try {
			const body = await readBody(event);
			const city = await updateCity(id, body);
			return city;
		} catch (error: any) {
			return {
				success: false,
				message: error.message,
			};
		}
	}

	if (method === "DELETE") {
		try {
			await deleteCity(id);
			return "City deleted successfully";
		} catch (error: any) {
			return {
				success: false,
				message: error.message,
			};
		}
	}
});
