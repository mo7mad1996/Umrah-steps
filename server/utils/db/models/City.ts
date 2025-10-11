import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
	{
		ar: { type: String, required: true },
		en: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.models.City || mongoose.model("City", citySchema);
