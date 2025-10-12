import ContactInfo from '../utils/db/models/ContactInfo';

export const getContactInfos = async () => {
  try {
    const contactInfos = await ContactInfo.find().sort({ order: 1 });
    return contactInfos;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch contact infos');
  }
};

export const createContactInfo = async (data: any) => {
  try {
    const contactInfo = await ContactInfo.create(data);
    return contactInfo;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create contact info');
  }
};

export const deleteContactInfo = async (id: string) => {
  try {
    await ContactInfo.findByIdAndDelete(id);
    return { success: true };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete contact info');
  }
};
