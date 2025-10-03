import mongoose from "mongoose";
import { IAmenity } from "~/types/hotel";
// variables

// User schema
const amenitySchema = new mongoose.Schema<IAmenity>(
	{
		ar: String,
		en: String,
		icon: String,
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
