import { UserService } from "../services/user";

const userService = new UserService();
export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	return userService.register(body);
});
