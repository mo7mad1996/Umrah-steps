import type { Hotel_DB_Schema } from "~/types/hotel"
import type { Query } from "~/types/Query"
import Hotel from "../utils/db/models/Hotel"

export class HotelService {
  async list(params: Query) {
    const page = params.page ?? 1
    const per_page = params.per_page ?? 10
    const includes = params.includes ?? ""
    const query = params.query ?? ""

    return await Hotel.find({})
  }

  async create(body: Hotel_DB_Schema) {
    const hotel = await Hotel.create(body)
    await hotel.save()
    return hotel
  }
}
