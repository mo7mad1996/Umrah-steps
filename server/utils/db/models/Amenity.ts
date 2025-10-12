import mongoose from "mongoose";
import { IAmenity } from "~/types/hotel";
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

// User schema
const amenitySchema = new mongoose.Schema<IAmenity>(
	{
		ar: String,
		en: String,
	},
	{
		toJSON: {
			transform(doc: any, ret: any, c) {
				ret.id = ret._id.toString();
				delete ret._id;
				delete ret.__v;

				return ret;
			},
		},
	},
);
export default mongoose.models.Amenity || mongoose.model("Amenity", amenitySchema);
