import Config from "../utils/db/models/Config";

export class ConfigService {
  async read(headers: any) {
    try {
      const { lang } = headers;

      console.log({ headers });
      // data
      return await Config.findOne({});
    } catch (err) {
      return err;
    }
  }
}
