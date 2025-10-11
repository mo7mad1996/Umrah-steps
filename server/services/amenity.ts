import type { IAmenity } from "~/types/hotel";
import type { Query } from "~/types/Query";
import Amenity from "../utils/db/models/Amenity";

export class AmenityService {
	async list(params: Query) {
		try {
			// data
			const page = params.page ?? 1;
			const per_page = params.per_page ?? 10;
			const query = params.query ?? {};

			// query
			const data: IAmenity[] = await Amenity.find({ ...query })
				.sort({ createdAt: "descending" })
				.skip(per_page * (page - 1))
				.limit(per_page)
				.exec();
			return data;
		} catch (err) {
			return err;
		}
	}

	async create(body: IAmenity) {
		try {
			// @ts-ignore
			delete body.id;

			const amenity = await Amenity.create(body);
			await amenity.save();
			return amenity;
		} catch (err) {
			return err;
		}
	}
}
