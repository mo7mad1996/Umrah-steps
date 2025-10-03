import { UserService } from "../services/user";

const userService = new UserService();
export default defineEventHandler(async (event) => {
	const data = await userService.login(await readBody(event));

	setCookie(event, "token", `Bearer ${data.token}`, {
		maxAge: 60 * 60 * 24 * 7,
	});
	return data;
});
