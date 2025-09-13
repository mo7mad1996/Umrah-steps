import { Query } from "~/types/Query"
import { HotelService } from "../services/hotel"
import { Hotel_DB_Schema } from "~/types/hotel"

const hotelService = new HotelService()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery<Query>(event)
    const cookies = parseCookies(event)

    switch (event.method) {
      case "GET":
        return await hotelService.list(query)

      case "POST":
        const body = await readBody(event)
        return await hotelService.create(body as Hotel_DB_Schema)

      default:
        throw createError({
          message: "method is not allowed.",
          status: 405,
        })
    }
  } catch (err: any) {
    return err
  }
})

