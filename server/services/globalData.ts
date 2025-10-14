import GlobalData from "../utils/db/models/GlobalData";

export class GlobalDataService {
	constructor() {
		this.createInit();
	}

	private async createInit() {
		const exists = await GlobalData.exists({});

		if (exists) return;
		const newData = await GlobalData.create({ mainPhone: "" });
		newData.save();
	}

	async update(data: any) {
		return await GlobalData.updateOne({}, data, { upsert: true });
	}

	async read() {
		return await GlobalData.findOne({});
	}
}
