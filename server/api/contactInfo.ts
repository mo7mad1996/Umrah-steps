import { getContactInfos, createContactInfo, deleteContactInfo } from '../services/contactInfo';

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === 'GET') {
    try {
      const contactInfos = await getContactInfos();
      return {
        success: true,
        data: contactInfos,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);
      const contactInfo = await createContactInfo(body);
      return {
        success: true,
        data: contactInfo,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  if (method === 'DELETE') {
    try {
      const query = getQuery(event);
      const id = query.id as string;

      if (!id) {
        return {
          success: false,
          message: 'ID is required',
        };
      }

      await deleteContactInfo(id);
      return {
        success: true,
        message: 'Contact info deleted successfully',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  return {
    success: false,
    message: 'Method not allowed',
  };
});
