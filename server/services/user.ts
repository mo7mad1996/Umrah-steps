import { User_DB_Schema, User_credentials } from "~/types/user";
import User from "../utils/db/models/User";
import jwt from "jsonwebtoken";

export class UserService {
	async getUserFromToken(token: string) {
		try {
			const payload: any = jwt.verify(token, process.env.JWT_SECRET || "Hello world");
			return await User.findOne({ _id: payload.id });
		} catch {
			return null;
		}
	}

	async register(payload: User_DB_Schema) {
		try {
			const exists = await User.exists({ email: payload.email });

			if (exists)
				return createError({
					message: "البريد الالكتروني مستخدم من قبل",
					status: 400,
				});

			const user = await User.create(payload);

			return user.login(payload.password);
		} catch (err) {
			console.error(err);
			return err;
		}
	}

	async login(credentials: User_credentials) {
		try {
			const user = await User.findOne({ email: credentials.email });
			console.log(user);
			if (!user) throw createError({ message: "بيانات الدخول غير صالحه", status: 401 });

			return user.login(credentials.password);
		} catch (err) {
			return err;
		}
	}

	async update(payload: User_DB_Schema | { password: string }, _id: string) {
		try {
			return await User.findOneAndUpdate({ _id }, payload, { new: true });
		} catch (err) {
			return err;
		}
	}

	async updatePassword({ currentPassword, newPassword }: any, u: any) {
		try {
			const valid = await u.checkPassword(currentPassword);
			if (!valid) throw createError({ message: "كلمة المرور غير صحيحه", status: 400 });

			return await this.update({ password: newPassword }, u.id);
		} catch (err) {
			return err;
		}
	}
}
