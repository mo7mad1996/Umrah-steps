import { Query } from "~/types/Query"
import { HotelService } from "../services/hotel"
import { Hotel_DB_Schema } from "~/types/hotel"

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery<Query>(event)
    const hotelService = new HotelService()

    switch (event.method) {
      case "GET":
        return await hotelService.list(query)

      case "POST":
        const body = await readBody(event)
        return await hotelService.create(body as Hotel_DB_Schema)

      default:
        throw createError({
          message: "method is not allow.",
          status: 405,
        })
    }
  } catch (err) {
    console.error(err)
    return err
  }
})

