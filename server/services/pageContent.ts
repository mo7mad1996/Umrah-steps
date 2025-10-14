import PageContent from "../utils/db/models/PageContent";

export const getPageContent = async (page: string) => {
	try {
		let content = await PageContent.findOne({ page });

		if (!content) content = await PageContent.create({ page });

		return content;
	} catch (error: any) {
		throw createError({ message: error.message, status: 400 });
	}
};

export const updatePageContent = async (page: string, data: any) => {
	try {
		const content = await PageContent.findOneAndUpdate(
			{ page },
			{ $set: data },
			{ new: true, upsert: true },
		);

		return content;
	} catch (error: any) {
		throw createError({ message: error.message, status: 400 });
	}
};

export const getAllPagesContent = async () => {
	try {
		return await PageContent.find();
	} catch (error) {
		throw error;
	}
};
