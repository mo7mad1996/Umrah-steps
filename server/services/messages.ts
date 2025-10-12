import Message from "../utils/db/models/Message";

export class MessageService {
	async list(lang: "ar" | "en") {
		try {
			return await Message.find().sort({ createdAt: "desc" }).exec();
		} catch (err) {
			return err;
		}
	}

	async create(body: any) {
		try {
			const message = await Message.create(body);
			await message.save();
			return message;
		} catch (err) {
			return err;
		}
	}

	async delete(id: string) {
		try {
			const message = await Message.findOneAndDelete({ _id: id });
			return message;
		} catch (err) {
			return err;
		}
	}
}
