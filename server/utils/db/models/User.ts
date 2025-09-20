import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import type { User_DB_Schema, default_schema } from "~/types/user";
import jwt from "jsonwebtoken";

// variables
const required_error = "هذا الحقل مطلوب";
const message = "بيانات الدخول غير صالحه";

// User schema
const userSchema = new mongoose.Schema<User_DB_Schema & default_schema>(
  {
    email: { type: String, required: [true, required_error], unique: true },
    password: { type: String, required: [true, required_error] },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    methods: {
      async login(password: string) {
        const isValid = await bcrypt.compare(password, this.password);
        if (!isValid) throw createError({ message, status: 401 });

        return {
          user: this.toJSON(),
          token: generateJWT(this.toJSON()),
        };
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

userSchema.pre("save", async function (next) {
  // hash password before saving
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

function generateJWT(user: User_DB_Schema & default_schema) {
  return jwt.sign(user, process.env.JWT_SECRET || "Hello world", {
    expiresIn: "7d",
  });
}

export default mongoose.models.User || mongoose.model("User", userSchema);
