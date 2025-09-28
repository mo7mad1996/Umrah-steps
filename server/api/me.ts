import { UserService } from "../services/user";

const userService = new UserService();

export default defineEventHandler(async (event) => {
	try {
		const token = getRequestHeader(event, "Authorization")?.replace("Bearer ", "") ?? "";
		const user = await userService.getUserFromToken(token);
		if (!user) return createError({ message: "Unauthorized", status: 401 });

		switch (event.method) {
			case "GET":
				return user;

			case "POST":
				const body = await readBody(event);
				return await userService.update(body, user.id);

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
