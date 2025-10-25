import type { IHotelListResponse, IHotelRequest, IHotelResponseWithMultiLang } from "~/types/hotel";
import type { Query } from "~/types/Query";
import Hotel from "../utils/db/models/Hotel";
import qs from "qs";
import mongoose from "mongoose";

function processQuery(query: any): Record<string, any> {
	const processed: Record<string, any> = {};

	for (const key in query) {
		const value = query[key];

		if (key === "location" && value.city) {
			if (mongoose.Types.ObjectId.isValid(value.city)) {
				processed["location.city"] = new mongoose.Types.ObjectId(value.city);
			}
		} else if (key === "price" || key === "rate") {
			processed[key] = {};
			for (const op in value) {
				const numValue = parseFloat(value[op]);
				if (!isNaN(numValue) && op.startsWith("$")) processed[key][op] = numValue;
			}
			if (Object.keys(processed[key]).length === 0) delete processed[key];
		} else if (key === "amenities" && Array.isArray(value)) {
			processed[key] = {
				$in: value
					.filter((id: string) => mongoose.Types.ObjectId.isValid(id))
					.map((id: string) => new mongoose.Types.ObjectId(id)),
			};

			if (processed[key].$in.length === 0) delete processed[key];
		} else processed[key] = value;
	}

	return processed;
}
export class HotelService {
	async list(queryString: string, lang: "ar" | "en") {
		try {
			// data
			const params = qs.parse(queryString) as Query;
			const page = params.page ?? 1;
			const per_page = params.per_page ?? 10;
			const rawQuery = params.query ?? {};

			const finalQuery = processQuery(rawQuery);
			// query
			const [data, count]: [IHotelResponseWithMultiLang[], number] = await Promise.all([
				Hotel.find(finalQuery) // ⬅️ تم استخدام finalQuery هنا
					.populate("location.city")
					.populate("amenities")
					.sort({ createdAt: "descending" })
					.skip(per_page * (page - 1))
					.limit(per_page)
					.exec(),

				Hotel.countDocuments({ ...finalQuery }),
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

	async update(id: string, body: IHotelRequest) {
		try {
			const hotel = await Hotel.findOneAndUpdate({ _id: id }, body, { new: true });

			return hotel;
		} catch (err) {
			return err;
		}
	}

	async delete(id: string) {
		try {
			const hotel = await Hotel.findOneAndDelete({ _id: id });
			return hotel;
		} catch (err) {
			return err;
		}
	}

	async get(id: string, query: Query, lang: "ar" | "en") {
		try {
			const hotel = await Hotel.findOne({ _id: id })
				.populate(query.includes || "")
				.exec();
			if (query.useLang == "true") return hotel?.lang(lang);
			return hotel;
		} catch (err) {
			return err;
		}
	}
}
