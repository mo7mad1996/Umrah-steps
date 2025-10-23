import mongoose from "mongoose";

// User schema
const GlobalDataSchema = new mongoose.Schema(
	{
		mainPhone: { type: String, default: "" },
		mainEmail: { type: String, default: "" },
		mainWhatsapp: { type: String, default: "" },
		commercial_registration: { type: String, default: "" },
		commercial_registration_link: { type: String, default: "" },
		tax_number: { type: String, default: "" },
		commercial_registration_number: { type: String, default: "" },
		license_number: { type: String, default: "" },
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
