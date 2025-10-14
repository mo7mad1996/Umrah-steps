import ContactInfo from "../utils/db/models/ContactInfo";

export const getContactInfos = async () => {
	try {
		return await ContactInfo.find();
	} catch (error: any) {
		throw new Error(error.message || "Failed to fetch contact infos");
	}
};

export const createContactInfo = async (data: any) => {
	try {
		return await ContactInfo.create(data);
	} catch (error: any) {
		throw new Error(error.message || "Failed to create contact info");
	}
};

export const deleteContactInfo = async (_id: string) => {
	try {
		return await ContactInfo.deleteOne({ _id });
	} catch (error: any) {
		throw new Error(error.message || "Failed to delete contact info");
	}
};
