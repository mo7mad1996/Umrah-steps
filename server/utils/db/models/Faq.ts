import mongoose from "mongoose";
// variables
const required_error = "هذا الحقل مطلوب";

// Sub-document schemas
const langSchema = new mongoose.Schema(
	{
		ar: { type: String, required: [true, required_error] },
		en: { type: String, required: [true, required_error] },
	},
	{ _id: false },
);


const FaqSchema = new mongoose.Schema(
	{
		question: { type: langSchema, required: [true, required_error] },
		answer: { type: langSchema, required: [true, required_error] },
	},
	{
		timestamps: true,
	},
);

FaqSchema.method("lang", function (this: any, lang: "ar" | "en") {
	return {
		id: this._id.toString(),
		question: this.question[lang],
		answer: this.answer[lang],
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
	};
});

FaqSchema.set("toJSON", {
	transform(doc: any, ret: any, c: any) {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});
export default mongoose.models.Faq || mongoose.model("Faq", FaqSchema);
