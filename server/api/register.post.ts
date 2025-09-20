import { UserService } from "../services/user";

const userService = new UserService();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log(body, typeof body);
  return userService.register(body);
});
