import WorkHours from "../utils/db/models/WorkHours";

export class WorkHoursService {
	async list(lang: "ar" | "en") {
		try {
			const res = await WorkHours.find();

			return res.map((i) => i.lang(lang));
		} catch (err) {
			return err;
		}
	}

	async create(body: any) {
		try {
			const workHours = await WorkHours.create(body);
			await workHours.save();
			return workHours;
		} catch (err) {
			return err;
		}
	}

	async update(id: string, body: any) {
		try {
			const workHours = await WorkHours.findOneAndUpdate({ _id: id }, body, { new: true });

			return workHours;
		} catch (err) {
			return err;
		}
	}

	async delete(id: string) {
		try {
			const workHours = await WorkHours.findOneAndDelete({ _id: id });
			return workHours;
		} catch (err) {
			return err;
		}
	}
}
