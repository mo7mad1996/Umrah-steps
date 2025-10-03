import type { IHotelListResponse, IHotelRequest, IHotelResponseWithMultiLang } from "~/types/hotel";
import type { Query } from "~/types/Query";
import Hotel from "../utils/db/models/Hotel";

export class HotelService {
	async list(params: Query, lang: "ar" | "en") {
		try {
			// data
			const page = params.page ?? 1;
			const per_page = params.per_page ?? 10;
			const query = params.query ?? {};

			// query
			const [data, count]: [IHotelResponseWithMultiLang[], number] = await Promise.all([
				Hotel.find({ ...query })
					.sort({ createdAt: "descending" })
					.skip(per_page * (page - 1))
					.limit(per_page)
					.exec(),

				Hotel.countDocuments({ ...query }),
			]);

			// result
			let res: IHotelListResponse = { data, count };

			if (params.useLang == "true") res = { data: data.map((hotel) => hotel.lang(lang)), count };

			return res;
		} catch (err) {
			return err;
		}
	}

	async create(body: IHotelRequest) {
		try {
			const hotel = await Hotel.create(body);
			await hotel.save();
			return hotel;
		} catch (err) {
			return err;
		}
	}
}
