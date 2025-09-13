import type { Hotel_DB_Schema } from "~/types/hotel"
import type { Query } from "~/types/Query"
import Hotel from "../utils/db/models/Hotel"

export class HotelService {
  async list(params: Query) {
    try {
      // data
      const page = params.page ?? 1
      const per_page = params.per_page ?? 10
      const includes = params.includes ?? ""
      const query = params.query ?? {}

      // query
      const hotels = await Hotel.find({ ...query })
        .sort({ createdAt: "descending" })
        .skip(per_page * (page - 1))
        .limit(per_page)
        .populate(includes.replaceAll(",", " "))
        .exec()

      // result
      if (params.lang) return hotels.map((hotel) => hotel.lang(params.lang))
      return hotels || []
    } catch (err) {
      return err
    }
  }

  async create(body: Hotel_DB_Schema) {
    const hotel = await Hotel.create(body)
    await hotel.save()
    return hotel
  }
}
