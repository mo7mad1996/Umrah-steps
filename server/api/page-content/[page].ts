import { getPageContent, updatePageContent } from '../../services/pageContent';

export default defineEventHandler(async (event) => {
  const method = event.method;
  const page = getRouterParam(event, 'page');

  if (!page) {
    return {
      success: false,
      message: 'Page parameter is required',
    };
  }

  if (method === 'GET') {
    try {
      const content = await getPageContent(page);
      return {
        success: true,
        data: content,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  if (method === 'PUT' || method === 'PATCH') {
    try {
      const body = await readBody(event);
      const content = await updatePageContent(page, body);
      return {
        success: true,
        data: content,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
});
