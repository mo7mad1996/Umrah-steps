import mongoose from "mongoose";
// variables

const MessageSchema = new mongoose.Schema(
	{
		question: { type: String, required: false },
		message: { type: String, required: false },
		subject: { type: String, required: false },
		phone: { type: String, required: false },
		email: { type: String, required: false },
		name: { type: String, required: false },
	},
	{
		timestamps: true,
	},
);

MessageSchema.set("toJSON", {
	transform(doc: any, ret: any, c: any) {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});
export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
