import { UserService } from "../services/user";

const userService = new UserService();
export default defineEventHandler(async (event) => {
	return userService.login(await readBody(event));
});
