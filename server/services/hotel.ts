import { Query } from "~/types/Query";

export class HotelService {
  async list(params: Query) {
    const page = params.page || 1;
    const per_page = params.per_page || 10;
    return Promise.resolve([]);
  }
}
