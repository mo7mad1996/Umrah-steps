import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
	{
		name: {
			ar: { type: String, required: true },
			en: { type: String, required: true },
		},
		description: {
			ar: { type: String, required: true },
			en: { type: String, required: true },
		},
		url: { type: String, required: true },
		icon: { type: String, required: true },
		color: { type: String, required: true, default: "#000000" },
	},
	{
		timestamps: true,
	},
);

export default mongoose.models.ContactInfo || mongoose.model("ContactInfo", contactInfoSchema);
