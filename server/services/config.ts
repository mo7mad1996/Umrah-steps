import Config from "../utils/db/models/Config";

export class ConfigService {
	async read(headers: any) {
		try {
			const { lang } = headers;

			// data
			return await Config.findOne({});
		} catch (err) {
			return err;
		}
	}
}
