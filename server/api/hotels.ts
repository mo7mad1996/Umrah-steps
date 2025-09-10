import { Query } from "~/types/Query";
import { HotelService } from "../services/hotel";

export default defineEventHandler(async (event) => {
  const body = readBody(event);
  const query = getQuery<Query>(event);
  const method = event.method;
  const hotelService = new HotelService();
  switch (method) {
    case "GET":
      return await hotelService.list(query);

    default:
      throw createError({
        statusCode: 405,
        name: "error",
        message: `Method: ${method} Not Allowed..`,
      });
  }
});
