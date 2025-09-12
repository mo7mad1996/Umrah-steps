import type { Schema } from "mongoose"

export type Hotel = {
  id: Schema.Types.ObjectId
  img?: string
  name: string
  description: string
  rate: number
  location: { city: string }
}

export type Hotel_DB_Schema = Hotel & {
  name: { ar: string; en: string }
  description: { ar: string; en: string }
  location: { city: { ar: string; en: string } }
}
