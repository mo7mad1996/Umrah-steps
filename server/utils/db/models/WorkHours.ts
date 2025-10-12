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

const WorkHoursSchema = new mongoose.Schema(
	{
		day: { type: langSchema, required: [true, required_error] },
		time: { type: langSchema, required: [true, required_error] },
	},
	{
		timestamps: true,
	},
);

WorkHoursSchema.method("lang", function (this: any, lang: "ar" | "en") {
	return {
		id: this._id.toString(),
		day: this.day[lang],
		time: this.time[lang],
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
	};
});

WorkHoursSchema.set("toJSON", {
	transform(doc: any, ret: any, c: any) {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
		return ret;
	},
});
export default mongoose.models.WorkHours || mongoose.model("WorkHours", WorkHoursSchema);
