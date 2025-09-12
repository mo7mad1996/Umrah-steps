import mongoose from "mongoose"

const required_error = "هذا الحقل مطلوب"

// Sub-document schemas
const langSchema = new mongoose.Schema(
  {
    ar: { type: String, required: [true, required_error] },
    en: { type: String, required: [true, required_error] },
  },
  { _id: false }
)
const locationSchema = new mongoose.Schema(
  {
    city: { type: langSchema, required: [true, required_error] },
  },
  { _id: false }
)

// Hotel schema
const hotelSchema = new mongoose.Schema(
  {
    name: { type: langSchema, required: true },
    description: { type: langSchema, required: true },
    location: { type: locationSchema, required: true },
    img: { type: String, default: "/logo/vertical.png" },
    rate: { type: Number, required: [true, "Rate is required"] },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret: any) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      },
    },
  }
)

export default mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema)
