import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import type { User_DB_Schema, default_schema } from "~/types/user";
import jwt from "jsonwebtoken";

// variables
const required_error = "هذا الحقل مطلوب";
const message = "بيانات الدخول غير صالحه";

type methods = {
	checkPassword(password: string): Promise<boolean>;
	login(password: string): Promise<any>;
};

// User schema
const userSchema = new mongoose.Schema<User_DB_Schema & default_schema & methods>(
	{
		name: { type: String },
		email: { type: String, required: [true, required_error], unique: true },
		phone: { type: String },
		password: { type: String, required: [true, required_error] },
		lastLogin: { type: Date },
		role: { type: String, enum: ["user", "admin"], default: "user" },
	},
	{
		methods: {
			checkPassword(password: string) {
				return bcrypt.compare(password, this.password);
			},
			async login(password: string) {
				const isValid = await this.checkPassword(password);
				if (!isValid) throw createError({ message, status: 401 });

				const response = {
					user: this.toJSON(),
					token: generateJWT(this.toJSON()),
				};

				this.lastLogin = new Date();
				await this.save();

				return response;
			},
		},
		timestamps: true,
		toJSON: {
			transform(doc: any, ret: any) {
				ret.id = ret._id.toString();
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		},
	},
);

userSchema.pre("findOneAndUpdate", async function (next) {
	// hash password before saving
	// @ts-expect-error
	if (this._update.password) {
		const salt = await bcrypt.genSalt(10);
		// @ts-expect-error
		const hashed = await bcrypt.hash(this._update.password, salt);
		// @ts-expect-error
		this._update.password = hashed;
	}
});
userSchema.pre("save", async function (next) {
	// hash password before saving
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
});

function generateJWT(user: User_DB_Schema & default_schema) {
	return jwt.sign(user, process.env.JWT_SECRET || "Hello world", { expiresIn: "7d" });
}

export default mongoose.models.User || mongoose.model("User", userSchema);
