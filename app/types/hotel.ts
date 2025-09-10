import type { Schema } from "mongoose";

export type Hotel = {
  id: Schema.Types.ObjectId;
  img?: string;
  name: string;
  description: string;
  rate: number;
  location: { city: string };
};
