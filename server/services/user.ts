import { User_DB_Schema, User_credentials } from "~/types/user"
import User from "../utils/db/models/User"

export class UserService {
  async register(payload: User_DB_Schema) {
    try {
      const exists = await User.exists({ email: payload.email })

      if (exists)
        return createError({
          message: "البريد الالكتروني مستخدم من قبل",
          status: 400,
        })
      const user = await User.create(payload)
      await user.save()

      return user.login(payload.password)
    } catch (err) {
      return err
    }
  }

  async login(credentials: User_credentials) {
    try {
      const user = await User.findOne({ email: credentials.email })

      if (!user)
        throw createError({ message: "بيانات الدخول غير صالحه", status: 401 })

      return user.login(credentials.password)
    } catch (err) {
      return err
    }
  }
}
