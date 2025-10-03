import { ConfigService } from "../services/config";

const configService = new ConfigService();

export default defineEventHandler(async (event) => {
	try {
		const headers = getHeaders(event);

		switch (event.method) {
			case "GET":
				return await configService.read(headers);

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
