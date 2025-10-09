import PageContent from '../utils/db/models/PageContent';

export const getPageContent = async (page: string) => {
  try {
    let content = await PageContent.findOne({ page });

    if (!content) {
      content = await PageContent.create({ page });
    }

    return content;
  } catch (error) {
    throw error;
  }
};

export const updatePageContent = async (page: string, data: any) => {
  try {
    const content = await PageContent.findOneAndUpdate(
      { page },
      { $set: data },
      { new: true, upsert: true }
    );

    return content;
  } catch (error) {
    throw error;
  }
};

export const getAllPagesContent = async () => {
  try {
    return await PageContent.find();
  } catch (error) {
    throw error;
  }
};
