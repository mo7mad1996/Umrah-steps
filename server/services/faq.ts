import Faq from "../utils/db/models/Faq";

export class FaqService {
	async list(lang: "ar" | "en") {
		try {
			const res = await Faq.find();

			return res.map((i) => i.lang(lang));
		} catch (err) {
			return err;
		}
	}

	async create(body: any) {
		try {
			const faq = await Faq.create(body);
			await faq.save();
			return faq;
		} catch (err) {
			return err;
		}
	}

	async update(id: string, body: any) {
		try {
			const faq = await Faq.findOneAndUpdate({ _id: id }, body, { new: true });

			return faq;
		} catch (err) {
			return err;
		}
	}

	async delete(id: string) {
		try {
			const faq = await Faq.findOneAndDelete({ _id: id });
			return faq;
		} catch (err) {
			return err;
		}
	}
}
