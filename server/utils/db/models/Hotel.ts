import mongoose from "mongoose";
import { IHotelResponse, IHotelResponseWithMultiLang } from "~/types/hotel";

const required_error = "هذا الحقل مطلوب";

// Sub-document schemas
const langSchema = new mongoose.Schema(
	{
		ar: { type: String, required: [true, required_error] },
		en: { type: String, required: [true, required_error] },
	},
	{ _id: false },
);

const locationSchema = new mongoose.Schema(
	{
		city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: [true, required_error] },
		address: { type: langSchema, required: false, default: "" },
	},
	{ _id: false },
);

// Hotel schema
const hotelSchema = new mongoose.Schema<IHotelResponseWithMultiLang>(
	{
		name: { type: langSchema, required: true },
		description: { type: langSchema, required: true },
		content: { type: langSchema, required: true },
		status: { type: String, default: "active" },
		price: { type: Number, required: true },
		amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],
		location: { type: locationSchema, required: true },
		img: { type: String, default: "/logo/light.png" },
		images: [{ type: String }],
		rate: { type: Number, required: [true, "Rate is required"] },
	},
	{
		timestamps: true,
		methods: {
			lang(lang: "ar" | "en"): IHotelResponse {
				return {
					id: this._id.toString(),
					name: this.name[lang],
					img: this.img,
					images: this.images || [],
					status: this.status,
					rate: this.rate,
					price: this.price,
					amenities: this.amenities,
					content: this.content[lang],
					createdAt: this.createdAt,
					updatedAt: this.updatedAt,
					description: this.description[lang],
					location: {
						address: this.location.address[lang],
					},
				};
			},
		},
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

export default mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
