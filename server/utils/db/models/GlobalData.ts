import mongoose from "mongoose";

// User schema
const GlobalDataSchema = new mongoose.Schema(
	{
		mainPhone: { type: String, default: "" },
	},
	{
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

export default mongoose.models.GlobalData || mongoose.model("GlobalData", GlobalDataSchema);
