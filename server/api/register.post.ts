import { UserService } from "../services/user"

const userService = new UserService()
export default defineEventHandler(async (event) => {
  return userService.register(await readBody(event))
})
