import mongoose from "mongoose";
// variables

// User schema
const configSchema = new mongoose.Schema(
  {},
  {
    methods: {},
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export default mongoose.models.Config || mongoose.model("Config", configSchema);
